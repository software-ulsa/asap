import { components } from "./components";

import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil/Perfil";
import Error from "../pages/Error";
import Home from "../pages/Home";

import Roles from "../pages/Configuracion/Rol/Roles";
import Categorias from "../pages/Configuracion/Categoria/Categorias";
import Carreras from "../pages/Configuracion/Carrera/Carreras";
import Especialidades from "../pages/Configuracion/Especialidad/Especialidades";

import {
  CategoryRounded,
  ClassRounded,
  ManageAccountsRounded,
  MasksRounded,
} from "@mui/icons-material";

var catalogues = [];
var children = [
  {
    path: "/",
    element: <Home key={1} />,
  },
  {
    path: "/perfil",
    element: <Perfil key={2} />,
  },
];

export const dashboardRoutes = (permisos) => {
  catalogues = [];
  children = [
    {
      path: "/",
      element: <Home key={1} />,
    },
    {
      path: "/perfil",
      element: <Perfil key={2} />,
    },
  ];

  if (permisos[0] === "*") {
    addCatalogue(-1);
    components.forEach((element) => {
      addRoute(element);
    });
  } else {
    permisos.forEach((permiso) => {
      addConfigurationCatalogue(permiso);

      const component = components.find((item) => item.name === permiso);
      if (component) {
        addRoute(component);
      }
    });
  }

  return {
    catalogues: catalogues,
    routes: [
      {
        path: "/",
        element: <Dashboard />,
        errorElement: <Error />,
        children: children,
      },
    ],
  };
};

const addRoute = (element) => {
  children.push({
    path: element.path,
    element: element.element,
    icon: element.icon,
  });

  if (element.subroutes) {
    element.subroutes.forEach((sub) => {
      children.push({
        path: sub.path,
        element: sub.element,
      });
    });
  }
};

const addConfigurationCatalogue = (catalogue) => {
  switch (catalogue) {
    case "ROLES":
      addCatalogue(0);
      return;

    case "CATEGORIAS":
      addCatalogue(1);
      return;

    case "CARRERAS":
      addCatalogue(2);
      return;

    case "ESPECIALIDADES":
      addCatalogue(3);
      return;

    default:
      return;
  }
};

const addCatalogue = (index) => {
  const configPath = components.find((item) => item.name === "CONFIGURACION");
  const pathFounded = children.find((item) => item.path === "/configuracion");

  if (!pathFounded) {
    addRoute(configPath);
  }

  const cataloguesAvailable = [
    {
      icon: <ManageAccountsRounded />,
      element: <Roles />,
      iconPosition: "start",
      value: "roles",
      label: "Roles",
    },
    {
      icon: <CategoryRounded />,
      element: <Categorias />,
      iconPosition: "start",
      value: "categorias",
      label: "Categorias",
    },
    {
      icon: <ClassRounded />,
      element: <Carreras />,
      iconPosition: "start",
      value: "carreras",
      label: "Carreras",
    },
    {
      icon: <MasksRounded />,
      element: <Especialidades />,
      iconPosition: "start",
      value: "especialidades",
      label: "Especialidades",
    },
  ];

  if (index === -1) {
    catalogues = catalogues.concat(cataloguesAvailable);
  } else {
    catalogues.push(cataloguesAvailable[index]);
  }
};
