import { useTodoList } from "./use-todo-list.ts";
import { useDeleteTodo } from "./use-delete-todo.ts";
import { useUpdateTodo } from "./use-update-todo.ts";
import { useUser } from "../auth/use-user.ts";
import { useCreateTodo } from "./use-create-todo.ts";

// const { data: todoItems, error,  isLoading, isPlaceholderData } = useQuery({
//   queryKey: ["tasks", "list", { page }],
//   queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
//   placeholderData: keepPreviousData, // сохраняет предыдущие данные при изменении queryKey, пока не загрузятся новые
//   // initialData: [] => данные для кеша, переданные вручную при первом рендере
//   enabled: isEnabled // Декларативно включаем/выключаем выполнение запроса
// });
// isPending - Нет данных вообще (первый запрос) | Наличие данных в кеше
// isFetching - Идёт любой запрос (включая фоновые)
// isLoading — Запрос находится в начальной стадии загрузки: данных ещё нет, и идёт первый запрос
// isPlaceholderData - Данные — временная заглушка

export function TodoList() {
  const { error, isLoading, todoItems } = useTodoList();
  const user = useUser();

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={"p-5 mx-auto max-w-[1200px] mt-10"}>
      <h1 className={"text-3xl font-bold mb-5"}>
        Todo List: {user.data?.login}
      </h1>

      <form
        onSubmit={createTodo.handleCreate}
        className={"flex gap-2 mb-5"}
      >
        <input
          className={"rounded p-2 border border-teal-500"}
          type="text"
          name="text"
        />
        <button
          disabled={createTodo.isLoading}
          className={"rounded p-2 border border-teal-500 disabled:opacity-50"}
        >
          Создать
        </button>
      </form>

      <div className={"flex flex-col gap-4"}>
        {todoItems?.map(todo =>
          <div
            className={"border border-slate-300 rounded p-3 flex justify-between"}
            key={todo.id}
          >
            <div className={"flex gap-1"}>
              <input
                onChange={() => updateTodo.handleUpdate(todo.id, todo.done)}
                checked={todo.done}
                type="checkbox"
              />
              <span className={todo.done ? "line-through" : ""}>{todo.text}</span>
            </div>
            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              onClick={() => deleteTodo.handleDelete(todo.id)}
              className={"text-rose-500 font-bold disabled:opacity-50"}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
