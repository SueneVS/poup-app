import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./screens/Home";
import GlobalStyle from "./GlobalStyle";
import Register from "./screens/Register";
import AppProvider from "./context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
