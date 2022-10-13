import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import CursoService from "../../services/CursoService";
import DataTable from "../../components/DataTable";
import CrearCurso from "./CrearCurso";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({
    id: -1,
  });

  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "titulo", label: "Titulo" },
    { field: "descripcion", label: "Descripción" },
  ];

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const notify = useCallback(
    (action, message) => {
      setFetched(!fetched);
      const configuration = {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      };
      action === "success"
        ? toast.success(message, configuration)
        : toast.error(message, configuration);
    },
    [fetched]
  );

  useEffect(() => {
    if (!fetched) {
      CursoService.getAllCurso()
        .then((response) => {
          setCursos(response);
          setFetched(true);
        })
        .catch((error) => {
          setFetched(true);
          notify("error", error.error);
        });
    }
  }, [fetched, notify]);

  useEffect(() => {
    if (itemToEdit && itemToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [itemToEdit]);

  const deleteAction = (id) => {
    CursoService.deleteCurso(id)
      .then((response) => {
        if (response.message) {
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  const editAction = (id) => {
    const found = cursos.find((rol) => rol.id === Number(id));
    setItemToEdit(found);
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
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleOpenCreate}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={cursos}
        headers={headers}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearCurso
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <ToastContainer />
    </>
  );
};

export default Cursos;
