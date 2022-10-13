import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DataTable from "../../components/DataTable";
import RolService from "../../services/RolService";
import CrearRol from "./CrearRol";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "descripcion", label: "Descripción" },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    RolService.getAllRoles()
      .then((response) => {
        setRoles(response);
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
        <title>Roles - ASAP</title>
        <meta name="Roles" content="Roles registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Roles
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleOpen}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={roles}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
      <CrearRol handleClose={handleClose} open={open} />
    </>
  );
};

export default Roles;
