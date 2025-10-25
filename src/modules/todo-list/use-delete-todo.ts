import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },
    /*
    * onSuccess(
    *   data,       - результат запроса
    *   variables,  - что передали в мутацию
    *   context     - что вернул onMutate в результате
    * ) {}
    * */
    onSuccess(_, deletedId) {
      // const todos = queryClient.getQueryData(
      //   todoListApi.getTodoListQueryOptions().queryKey
      // )
      // if (todos) {
      //   queryClient.setQueryData(
      //     todoListApi.getTodoListQueryOptions().queryKey,
      //     todos.filter(item => item.id !== deletedId)
      //   )
      // }
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        todos => todos?.filter(item => item.id !== deletedId)
      )
    }
  });

  // Optimistic update — сразу обновляем UI, как будто запрос уже успешен, а потом либо подтверждаем, либо откатываем при ошибке.
  // Pessimistic update — ждём ответа от сервера, и только потом обновляем UI.

  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id
  };
}
