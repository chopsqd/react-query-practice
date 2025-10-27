import { TodoList } from "../modules/todo-list/todo-list.tsx";
import { useUser } from "../modules/auth/use-user.ts";
import { Login } from "../modules/auth/login.tsx";
import { LogoutButton } from "../modules/auth/logout-button.tsx";
import { prefetchAuth } from "../modules/auth/prefetch-auth.ts";

export function App() {
  const user = useUser();

  prefetchAuth()

  if (user.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (user.data) {
    return <>
      <LogoutButton />
      <TodoList />
    </>;
  }

  return <Login />;
}
