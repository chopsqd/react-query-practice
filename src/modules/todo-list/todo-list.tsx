import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string
  text: string
  done: boolean
}

export const getTasks = () => {
  return new Promise<Todo[]>(res => {
    setTimeout(() => {
      res([
        { id: "1", text: "todo 1", done: false },
        { id: "2", text: "todo 2", done: false },
        { id: "3", text: "todo 3", done: false }
      ]);
    }, 1000);
  });
};

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks", "list"],
    queryFn: getTasks
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      {data.map(todo =>
        <div key={todo.id}>{todo.text}</div>
      )}
    </div>
  );
}
