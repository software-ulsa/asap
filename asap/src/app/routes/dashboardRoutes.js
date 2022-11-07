import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Opciones from "../pages/Configuracion/Opciones";

import Usuarios from "../pages/Usuario/Usuarios";

import Especialistas from "../pages/Especialista/Especialistas";
import Notas from "../pages/Nota/Notas";
import Publicidades from "../pages/Publicidad/Publicidades";

import Cursos from "../pages/Curso/Cursos";
import EditarCurso from "../pages/Curso/EditarCurso";

import Perfil from "../pages/Perfil/Perfil";
import Error from "../pages/Error";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <div key={1}>hola</div>,
      },
      {
        path: "/perfil",
        element: <Perfil key={2} />,
      },
      {
        path: "/usuarios",
        element: <Usuarios key={3} />,
      },
      {
        path: "/especialistas",
        element: <Especialistas key={4} />,
      },
      {
        path: "/notas",
        element: <Notas key={5} />,
      },
      {
        path: "/publicidad",
        element: <Publicidades key={6} />,
      },
      {
        path: "/cursos",
        element: <Cursos key={7} />,
      },
      {
        path: "/editar-curso",
        element: <EditarCurso key={8} />,
      },
      {
        path: "/configuracion",
        element: <Opciones key={9} />,
      },
    ],
  },
]);

export default routes;
