import { useState } from "react";

import {
  CategoryRounded,
  ClassRounded,
  ManageAccountsRounded,
  MasksRounded,
} from "@mui/icons-material";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Roles from "../Rol/Roles";

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
          <TabPanel value="categorias">Item 2</TabPanel>
          <TabPanel value="carreras">Item 3</TabPanel>
          <TabPanel value="especialidades">Item 4</TabPanel>
        </Box>
      </Box>
    </TabContext>
  );
};

export default Opciones;
