import type { AppThunk } from "../../shared/store/redux.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authSlice } from "./auth.slice.ts";

export const logoutThunk = (): AppThunk =>
  async (dispatch) => {
    dispatch(authSlice.actions.removeUser());

    // resetQueries - приводит текущие запросы к начальному состоянию
    // removeQueries - полностью удаляет из кеша

    queryClient.removeQueries(); // Полная очистка кэша в приложении
    localStorage.removeItem("userId");
  };
