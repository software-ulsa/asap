import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Roles from "../pages/Rol/Roles";
import Usuarios from "../pages/Usuario/Usuarios";
import Especialistas from "../pages/Especialista/Especialistas";
import Notas from "../pages/Nota/Notas";
import Publicidades from "../pages/Publicidad/Publicidades";

import Cursos from "../pages/Curso/Cursos";
import EditarCurso from "../pages/Curso/EditarCurso";
import Perfil from "../pages/Perfil/Perfil";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/perfil",
        element: <Perfil />,
      },
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
      {
        path: "/editar-curso",
        element: <EditarCurso />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/" /> },
  { path: "*", element: <div>404</div> },
]);

export default routes;
