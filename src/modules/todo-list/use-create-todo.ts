import type React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      // queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
      //    ↳ Инвалидирует все запросы, чей queryKey начинается с [baseKey] (префиксное совпадение)
      await queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
      //    ↳ Передаёт полный объект настроек запроса, включая точный queryKey (точное совпадение)
    },
    // onSuccess - Успех
    // onError - Ошибка
    // onSettled - В любом случае (по завершению)
  });

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createTodoMutation.mutate({
      id: Date.now().toString(),
      done: false,
      text: (formData.get("text") ?? "").toString(),
      userId: "1"
    });

    e.currentTarget.reset();
  };

  return {
    handleCreate,
    isPending: createTodoMutation.isPending
  };
}
