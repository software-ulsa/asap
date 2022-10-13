import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EspecialistaService from "../../services/EspecialistaService";
import DataTable from "../../components/DataTable";
import { Helmet } from "react-helmet";

const Especialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "especialidad", label: "Especialidad" },
    { field: "cedula", label: "Cédula" },
    { field: "telefono", label: "Teléfono" },
  ];

  useEffect(() => {
    EspecialistaService.getAllEspecialista()
      .then((response) => {
        setEspecialistas(response);
        setFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetched]);

  const dummyAction = () => {
    console.log("huevos");
  };

  return (
    <>
      <Helmet>
        <title>Especialistas - ASAP</title>
        <meta name="Especialistas" content="Especialistas registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Especialistas
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button fullWidth variant="contained" color="success">
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={especialistas}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
    </>
  );
};

export default Especialistas;
