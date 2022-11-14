import {
  BookmarksRounded,
  Face4Rounded,
  MedicationRounded,
  PagesRounded,
  PersonRounded,
  SellRounded,
} from "@mui/icons-material";

import Opciones from "../pages/Configuracion/Opciones";

import Usuarios from "../pages/Usuario/Usuarios";
import Pacientes from "../pages/Paciente/Pacientes";
import Especialistas from "../pages/Especialista/Especialistas";

import Publicidades from "../pages/Publicidad/Publicidades";

import Notas from "../pages/Nota/Notas";

import Cursos from "../pages/Curso/Cursos";
import Actividades from "../pages/Actividad/Actividades";

export const components = [
  {
    path: "/usuarios",
    name: "USUARIOS",
    element: <Usuarios key={3} />,
    icon: <PersonRounded />,
  },
  {
    path: "/especialistas",
    name: "ESPECIALISTAS",
    element: <Especialistas key={4} />,
    icon: <MedicationRounded />,
  },
  {
    path: "/notas",
    name: "NOTAS",
    element: <Notas key={5} />,
    icon: <PagesRounded />,
  },
  {
    path: "/publicidad",
    name: "PUBLICIDADES",
    element: <Publicidades key={6} />,
    icon: <SellRounded />,
  },
  {
    path: "/cursos",
    name: "CURSOS",
    element: <Cursos key={7} />,
    icon: <BookmarksRounded />,
    subroutes: [
      {
        path: "/actividades",
        element: <Actividades key={8} />,
      },
    ],
  },
  {
    path: "/configuracion",
    name: "CONFIGURACION",
    element: <Opciones key={9} />,
    icon: "no-icon",
  },
  {
    path: "/pacientes",
    name: "PACIENTES",
    element: <Pacientes key={10} />,
    icon: <Face4Rounded />,
  },
];
