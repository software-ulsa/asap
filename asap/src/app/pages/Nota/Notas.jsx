import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NotaService from "../../services/NotaService";
import DataTable from "../../components/DataTable";
import { Helmet } from "react-helmet";

const Notas = () => {
  const [notas, setNotas] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "titulo", label: "Titulo" },
    { field: "tema", label: "Tema" },
  ];

  useEffect(() => {
    NotaService.getAllNotas()
      .then((response) => {
        setNotas(response);
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
        <title>Notas - ASAP</title>
        <meta name="Notas" content="Notas registradas" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Notas
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button fullWidth variant="contained" color="success">
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={notas}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
    </>
  );
};

export default Notas;
