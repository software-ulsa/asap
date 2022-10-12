import {
  BookmarksRounded,
  ManageAccountsRounded,
  MedicationRounded,
  PagesRounded,
  PersonRounded,
  SellRounded,
} from "@mui/icons-material";

export const navigations = [
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: <PersonRounded />,
  },
  { name: "Roles", path: "/roles", icon: <ManageAccountsRounded /> },
  {
    name: "Especialistas",
    path: "/usuarios",
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
];
