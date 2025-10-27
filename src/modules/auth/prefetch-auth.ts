import { authSlice } from "./auth.slice.ts";
import { store } from "../../shared/store/redux.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "./api.ts";

export function prefetchAuth() {
  const userId = authSlice.selectors.userId(store.getState())
  if (userId) {
    // prefetchQuery — предварительно загружает данные в кэш React Query до того, как они понадобятся
    queryClient.prefetchQuery(authApi.getUserById(userId))
  }
}
