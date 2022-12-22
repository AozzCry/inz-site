import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import App from "./App";

import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./utils/themes.jsx";

import { QueryClient, QueryClientProvider } from "react-query";

import { ContextProvider } from "./utils/Context.jsx";

//axios.defaults.baseURL = "https://emicro-api.azurewebsites.net";
axios.defaults.baseURL = "http://localhost:8080";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
