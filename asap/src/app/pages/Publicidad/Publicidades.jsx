import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PublicidadService from "../../services/PublicidadService";
import DataTable from "../../components/DataTable";
import { Helmet } from "react-helmet";

const Publicidades = () => {
  const [publicidades, setPublicidades] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "dot_empresa", label: "Empresa" },
    { field: "email", label: "Correo" },
  ];

  useEffect(() => {
    PublicidadService.getAllPublicidad()
      .then((response) => {
        setPublicidades(response);
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
        <title>Publicidades - ASAP</title>
        <meta name="Publicidades" content="Publicidades registradas" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Publicidades
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button fullWidth variant="contained" color="success">
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={publicidades}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
    </>
  );
};

export default Publicidades;
