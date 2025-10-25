import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance.ts";

export type PaginatedResult<T> = {
  data: T[]
  first: number,
  last: number,
  next: number | null,
  prev: number | null,
  pages: number,
  items: number,
}

export type TodoDTO = {
  id: string
  text: string
  done: boolean
  userId: string
}

export const todoListApi = {
  // getTodoListInfiniteQueryOptions: () => {
  //   return infiniteQueryOptions({
  //     queryKey: ["tasks", "list"],
  //     // queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
  //     queryFn: meta =>
  //       jsonApiInstance<PaginatedResult<TodoDTO>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {
  //         signal: meta.signal
  //       }),
  //     initialPageParam: 1, // начальное значение параметра страницы
  //     getNextPageParam: (result) => result.next, // функция, которая из ответа текущей страницы извлекает параметр для следующей
  //     // getPreviousPageParam: (result) => result.prev, // функция, которая из ответа текущей страницы извлекает параметр для предыдущей
  //     select: (result) => result.pages.flatMap(page => page.data) // Подготовка данных перед отображением
  //   });
  // },
  baseKey: 'tasks',

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: meta =>
        jsonApiInstance<TodoDTO[]>(`/tasks`, {
          signal: meta.signal
        })
    });
  },

  createTodo: (data: TodoDTO) => {
    return jsonApiInstance<TodoDTO>(`/tasks`, {
      method: 'POST',
      json: data
    })
  },

  updateTodo: (data: Partial<TodoDTO> & { id: string }) => {
    return jsonApiInstance<TodoDTO>(`/tasks/${data.id}`, {
      method: 'PATCH',
      json: data
    })
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: 'DELETE'
    })
  }
};
