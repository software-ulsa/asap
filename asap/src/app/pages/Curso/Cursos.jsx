import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CursoService from "../../services/CursoService";
import DataTable from "../../components/DataTable";
import { Helmet } from "react-helmet";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "titulo", label: "Titulo" },
    { field: "descripcion", label: "Descripción" },
  ];

  useEffect(() => {
    CursoService.getAllCurso()
      .then((response) => {
        setCursos(response);
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
        <title>Cursos - ASAP</title>
        <meta name="Cursos" content="Cursos registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Cursos
          </Typography>
        </Grid>
        <Grid item xs={2} justifyContent="center">
          <Button fullWidth variant="contained" color="success">
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={cursos}
        headers={headers}
        deleteAction={dummyAction}
        editAction={dummyAction}
      />
    </>
  );
};

export default Cursos;
