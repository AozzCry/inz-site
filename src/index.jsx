import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";

import { ContextProvider } from "./utils/Context.jsx";

axios.defaults.baseURL = "https://emicro-api.azurewebsites.net";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </QueryClientProvider>
);
