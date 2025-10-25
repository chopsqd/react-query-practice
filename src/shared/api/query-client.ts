import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000
      // stale time - время, в течение которого данные считаются актуальными
      // gc time - время, через которое неиспользуемые данные удаляются из кеша
    }
  }
})
