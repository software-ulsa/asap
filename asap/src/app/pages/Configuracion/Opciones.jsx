import { useState } from "react";

import {
  CategoryRounded,
  ClassRounded,
  ManageAccountsRounded,
  MasksRounded,
} from "@mui/icons-material";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Roles from "./Rol/Roles";
import Carreras from "./Carrera/Carreras";
import Categorias from "./Categoria/Categorias";
import Especialidades from "./Especialidad/Especialidades";

const Opciones = () => {
  const [opcion, setOpcion] = useState("roles");

  return (
    <TabContext value={opcion}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => setOpcion(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              icon={<ManageAccountsRounded />}
              iconPosition="start"
              value="roles"
              label="Roles"
            />
            <Tab
              icon={<CategoryRounded />}
              iconPosition="start"
              value="categorias"
              label="Categorias"
            />
            <Tab
              icon={<ClassRounded />}
              iconPosition="start"
              value="carreras"
              label="Carreras"
            />
            <Tab
              icon={<MasksRounded />}
              iconPosition="start"
              value="especialidades"
              label="Especialidades"
            />
          </TabList>
        </Box>
        <Box>
          <TabPanel value="roles">
            <Roles />
          </TabPanel>
          <TabPanel value="categorias">
            <Categorias />
          </TabPanel>
          <TabPanel value="carreras">
            <Carreras />
          </TabPanel>
          <TabPanel value="especialidades">
            <Especialidades />
          </TabPanel>
        </Box>
      </Box>
    </TabContext>
  );
};

export default Opciones;
