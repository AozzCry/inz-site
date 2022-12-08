import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios"; // del
import API from "./env.jsx";

import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./utils/themes.jsx";

import { QueryClient, QueryClientProvider } from "react-query";

import { UserContextProvider } from "./utils/UserContext.jsx";

axios.defaults.baseURL = API;
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
