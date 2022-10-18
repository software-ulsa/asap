import React, { useCallback, useState } from "react";

import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";

import EditarActividad from "./EditarActividad";

import ActividadService from "../../../services/ActividadService";

const ActividadItem = ({ actividad, setFetched, notify }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const eliminarActividad = () => {
    ActividadService.deleteActividad(actividad.id)
      .then((response) => {
        if (response.message) {
          setFetched(false);
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  return (
    <>
      <Card sx={{ display: "flex", justifyContent: "center", height: 200 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {actividad.titulo}
            </Typography>
            <Typography component="div" variant="h7">
              {actividad.descripcion}
            </Typography>
          </CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              pb: 2,
              px: 2,
            }}
          >
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleOpenEdit}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={eliminarActividad}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
        <CardMedia sx={{ width: 150, backgroundColor: "#000" }}></CardMedia>
      </Card>

      <EditarActividad
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        actividad={actividad}
        setFetched={setFetched}
      />
    </>
  );
};

export default ActividadItem;
