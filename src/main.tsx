import ReactDOM from "react-dom/client";
import { worker } from "./api/mocks/browser.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "leaflet/dist/leaflet.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth/register",
    element: <LoginPage />,
  },
]);

const [MILLISECOND, SECOND, MINUTE] = [1000, 60, 5];
const STALE_TIME = MILLISECOND * SECOND * MINUTE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
