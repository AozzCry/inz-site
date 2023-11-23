import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';
import fetch from './hooks/fetchHooks';

import { ContextProvider } from './utils/Context.jsx';

axios.defaults.baseURL = 'https://emicro-api-v2.azurewebsites.net';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { queryFn: fetch.get, retry: 0, refetchOnWindowFocus: false },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </QueryClientProvider>
);
