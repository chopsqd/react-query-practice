const BASE_URL = " http://localhost:3000";

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
  getTodoList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    return fetch(
      `${BASE_URL}/tasks?_page=${page}&_per_page=10`,
      { signal }
    ).then(
      res => res.json() as Promise<PaginatedResult<TodoDTO>>
    );
  }
};
