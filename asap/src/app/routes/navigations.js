import {
  BookmarksRounded,
  Face4Rounded,
  MedicationRounded,
  PagesRounded,
  PersonRounded,
  SellRounded,
  Task,
} from "@mui/icons-material";

export const navigations = [
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: <PersonRounded />,
  },
  {
    name: "Pacientes",
    path: "/pacientes",
    icon: <Face4Rounded />,
  },
  {
    name: "Especialistas",
    path: "/especialistas",
    icon: <MedicationRounded />,
  },
  {
    name: "Notas",
    path: "/notas",
    icon: <PagesRounded />,
  },
  {
    name: "Publicidad",
    path: "/publicidad",
    icon: <SellRounded />,
  },
  {
    name: "Cursos",
    path: "/cursos",
    icon: <BookmarksRounded />,
  },
  {
    name: "Seleccionar Notas",
    path: "/seleccionar-nota",
    icon: <Task />,
  },
];
