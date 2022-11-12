import { HomeRounded } from "@mui/icons-material";
import { components } from "./components";

export const navigations = (permisos) => {
  let buttonsNav = [
    {
      path: "/",
      name: "INICIO",
      icon: <HomeRounded />,
    },
  ];

  if (permisos[0] === "*") {
    components.forEach((element) => {
      if (element.name !== "CONFIGURACION") {
        buttonsNav.push({
          path: element.path,
          name: element.name,
          icon: element.icon,
        });
      }
    });
  } else {
    permisos.forEach((permiso) => {
      const element = components.find((item) => item.name === permiso);
      if (element) {
        buttonsNav.push({
          path: element.path,
          name: element.name,
          icon: element.icon,
        });
      }
    });
  }

  return buttonsNav;
};
