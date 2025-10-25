import { useTodoList } from "./use-todo-list.tsx";

export function TodoList() {
  const {error, isLoading, todoItems, cursor} = useTodoList()
  // const [page, setPage] = useState(1);
  // const [isEnabled, setIsEnabled] = useState(false);

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

  // if (status === 'pending' && fetchStatus === 'fetching')
  if (isLoading)
    return <div>Loading...</div>;

  if (error)
    return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className={"p-5 mx-auto max-w-[1200px] mt-10"}>
      <h1 className={"text-3xl font-bold mb-5"}>Todo List:</h1>
      {/*<button*/}
      {/*  onClick={() => setIsEnabled(e => !e)}*/}
      {/*  className={"p-3 rounded border border-teal-500 cursor-pointer"}*/}
      {/*>*/}
      {/*  Toggle Enabled*/}
      {/*</button>*/}

      {/*<div className={"flex flex-col gap-4" + (isPlaceholderData ? " opacity-50" : "")}>*/}
      <div className={"flex flex-col gap-4"}>
        {todoItems?.map(todo =>
          <div
            className={"border border-slate-300 rounded p-3"}
            key={todo.id}
          >
            {todo.text}
          </div>
        )}
      </div>

      {cursor}

      {/*<div className={"flex gap-2 mt-5"}>*/}
      {/*  <button*/}
      {/*    onClick={() => setPage(p => Math.max(p - 1, 0))}*/}
      {/*    className={"p-3 rounded border border-teal-500 cursor-pointer"}*/}
      {/*  >*/}
      {/*    Prev*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={() => setPage(p => Math.min(p + 1, todoItems?.pages || 1))}*/}
      {/*    className={"p-3 rounded border border-teal-500 cursor-pointer"}*/}
      {/*  >*/}
      {/*    Next*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
}
