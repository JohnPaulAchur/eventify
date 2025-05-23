import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </>
);
