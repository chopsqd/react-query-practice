import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    onMutate: async newTodo => {
      // Отменяем любые запросы по baseKey (во избежание состояния гонки)
      await queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey]
      })

      // Получаем данные из кэша (на текущий момент)
      const prevTodos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey
      )

      // Оптимистично обновляем на новое значение (меняем кэш)
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
          old => old?.map(
            todo => todo.id === newTodo.id ? {...todo, ...newTodo} : todo
          )
      )

      // Возвращаем контекст со снапшотом данных из кэша
      return { prevTodos }
    },
    // При ошибке => возвращаем данные из снапшота
    onError: (err, newTodo, context) => {
      if (context) {
        // Используем возвращаемый из onMutate контекст для отката
        queryClient.setQueryData(todoListApi.getTodoListQueryOptions().queryKey, context.prevTodos)
      }
    },
    // Всегда делаем refetch (для стабильности все равно перезапрашиваем данные)
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const handleUpdate = (id: string, done: boolean) => {
    updateTodoMutation.mutate({ id, done: !done });
  };

  return { handleUpdate };
}
