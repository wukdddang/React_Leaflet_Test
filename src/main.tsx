import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { worker } from "./mocks/browser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  worker.start();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
