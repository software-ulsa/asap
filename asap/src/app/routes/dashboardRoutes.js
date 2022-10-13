import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Roles from "../pages/Rol/Roles";
import Usuarios from "../pages/Usuario/Usuarios";
import Especialistas from "../pages/Especialista/Especialistas";
import Notas from "../pages/Nota/Notas";
import Publicidades from "../pages/Publicidad/Publicidades";
import Cursos from "../pages/Curso/Cursos";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/usuarios",
        element: <Usuarios />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
      {
        path: "/especialistas",
        element: <Especialistas />,
      },
      {
        path: "/notas",
        element: <Notas />,
      },
      {
        path: "/publicidad",
        element: <Publicidades />,
      },
      {
        path: "/cursos",
        element: <Cursos />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/" /> },
  { path: "*", element: <div>tss te has perdido macho</div> },
]);

export default routes;
