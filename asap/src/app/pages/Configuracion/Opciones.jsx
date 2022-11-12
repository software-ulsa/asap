import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { dashboardRoutes } from "../../routes/dashboardRoutes";

const Opciones = () => {
  const [opcion, setOpcion] = useState("roles");
  const { currentUser } = useSelector((state) => state.auth);
  const catalogues = dashboardRoutes(currentUser.rol.permisos).catalogues;

  return (
    <TabContext value={opcion}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(event, newValue) => setOpcion(newValue)}
            textColor="primary"
            indicatorColor="primary"
          >
            {catalogues.map((tab) => {
              return (
                <Tab
                  icon={tab.icon}
                  iconPosition={tab.iconPosition}
                  value={tab.value}
                  label={tab.label}
                />
              );
            })}
          </TabList>
        </Box>
        <Box>
          {catalogues.map((tab) => {
            return <TabPanel value={tab.value}>{tab.element}</TabPanel>;
          })}
        </Box>
      </Box>
    </TabContext>
  );
};

export default Opciones;
