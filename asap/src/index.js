import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Publicity from "./pages/Publicity";
import Admins from "./pages/Admins";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Root from "./routes/root";
import AddPublicity from "./pages/AddPublicity";
import AddAdmin from "./pages/AddAdmin";
import Login from "./pages/Login";

const privateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/publicidad",
        element: <Publicity />,
      },
      {
        path: "/agregar-publicidad:editable:id",
        element: <AddPublicity />,
      },
      {
        path: "/administradores",
        element: <Admins />,
      },
      {
        path: "/agregar-administrador:editable:id",
        element: <AddAdmin/>,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/*",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

let isUser = localStorage.getItem("user");

root.render(
  <React.StrictMode>
    {isUser ? <RouterProvider router={privateRouter} /> : <RouterProvider router={publicRouter} />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
