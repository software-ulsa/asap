import { createBrowserRouter, Navigate } from "react-router-dom";

import AddPublicity from "../pages/AddPublicity";
import AddAdmin from "../pages/AddAdmin";
import Account from "../pages/Account";

import Users from "../pages/User";
import AddUser from "../pages/AddUser";
import Publication from "../pages/Publication";
import AddPublication from "../pages/AddPublication";

import Specialist from "../pages/Specialist";
import AddSpecialist from "../pages/AddSpecialist";
import Publicity from "../pages/Publicity";
import Admins from "../pages/Admins";
import Dashboard from "../pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
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
        element: <AddAdmin />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/usuarios",
        element: <Users />,
      },
      {
        path: "/agregar-usuario:editable:id",
        element: <AddUser />,
      },
      {
        path: "/publicacion",
        element: <Publication />,
      },
      {
        path: "/agregar-publicacion:editable:id",
        element: <AddPublication />,
      },
      {
        path: "/especialistas",
        element: <Specialist />,
      },
      {
        path: "/agregar-especialista:editable:id",
        element: <AddSpecialist />,
      },
    ],
  },
  { path: "/", element: <Navigate to="/" /> },
  { path: "*", element: <div>tss te has perdido macho</div> },
]);

export default routes;
