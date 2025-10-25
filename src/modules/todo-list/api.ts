import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
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
}

export const todoListApi = {
  // getTodoList: (
  //   { page }: { page: number },
  //   { signal }: { signal: AbortSignal }
  // ) => {
  //   return fetch(
  //     `${BASE_URL}/tasks?_page=${page}&_per_page=10`,
  //     { signal }
  //   ).then(
  //     res => res.json() as Promise<PaginatedResult<TodoDTO>>
  //   );
  // },

  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: meta =>
        jsonApiInstance<PaginatedResult<TodoDTO>>(`/tasks?_page=${page}&_per_page=10`, {
          signal: meta.signal
        })
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      // queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
      queryFn: meta =>
        jsonApiInstance<PaginatedResult<TodoDTO>>(`/tasks?_page=${meta.pageParam}&_per_page=10`, {
          signal: meta.signal
        }),
      initialPageParam: 1, // начальное значение параметра страницы
      getNextPageParam: (result) => result.next, // функция, которая из ответа текущей страницы извлекает параметр для следующей
      // getPreviousPageParam: (result) => result.prev, // функция, которая из ответа текущей страницы извлекает параметр для предыдущей
      select: (result) => result.pages.flatMap(page => page.data) // Подготовка данных перед отображением
    });
  }
};
