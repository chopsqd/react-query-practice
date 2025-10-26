import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "./app.tsx";
import "./index.css";
import { queryClient } from "../shared/api/query-client.ts";
import { store } from "../shared/store/redux.ts";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { onlineManager } from "@tanstack/react-query";

onlineManager.setOnline(navigator.onLine)

const persister = createSyncStoragePersister({
  storage: window.localStorage
});

// Persist storage - кэши из запросов сохраняются в localStorage
// Если зайти в offline mode - данные будут из localStorage

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // Возобновить мутации после первоначального восстановления из localStorage
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
      <ReactQueryDevtools />
    </PersistQueryClientProvider>
  </StrictMode>
);
