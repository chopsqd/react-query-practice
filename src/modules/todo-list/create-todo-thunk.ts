import type { AppThunk } from "../../shared/store/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/query-client.ts";
import { type TodoDTO, todoListApi } from "./api.ts";
import { authSlice } from "../auth/auth.slice.ts";
import { authApi } from "../auth/api.ts";

export const createTodoThunk = (text: string): AppThunk =>
  async (dispatch, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("Пользователь не авторизован");
    }

    const user = await queryClient.fetchQuery(authApi.getUserById(userId))

    const newTodo: TodoDTO = {
      id: Date.now().toString(),
      done: false,
      text: `${text}. Owner: ${user.login}`,
      userId
    };

    // Optimistic update
    queryClient.cancelQueries({
      queryKey: [todoListApi.baseKey]
    });

    const prevTodos = queryClient.getQueryData(todoListApi.getTodoListQueryOptions().queryKey);

    queryClient.setQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
      todos => [...(todos ?? []), newTodo]
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo
      }).mutate(newTodo);
    } catch (e) {
      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        prevTodos
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      })
    }
  };

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ["create-todo"]
  }).isPending;
