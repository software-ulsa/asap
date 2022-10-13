import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UsuarioService from "../../services/UsuarioService";
import DataTable from "../../components/DataTable";
import { Helmet } from "react-helmet";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "correo", label: "Correo" },
    { field: "telefono", label: "Teléfono" },
    { field: "rol", subfield: "nombre", label: "Rol" },
  ];

  useEffect(() => {
    UsuarioService.getAllUsers()
      .then((response) => {
        setUsuarios(response);
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
        <title>Usuarios - ASAP</title>
        <meta name="Usuarios" content="Usuarios registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Usuarios
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button fullWidth variant="contained" color="success">
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={usuarios}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
    </>
  );
};

export default Usuarios;
