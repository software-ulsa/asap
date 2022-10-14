import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import EspecialistaService from "../../services/EspecialistaService";
import DataTable from "../../components/DataTable";
import CrearEspecialista from "./CrearEspecialista";

const Especialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({
    id: -1,
  });

  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "especialidad", label: "Especialidad" },
    { field: "cedula", label: "Cédula" },
    { field: "telefono", label: "Teléfono" },
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
      EspecialistaService.getAllEspecialista()
        .then((response) => {
          setEspecialistas(response);
          setFetched(true);
        })
        .catch((error) => {
          setFetched(true);
        });
    }
  }, [fetched, notify]);

  useEffect(() => {
    if (itemToEdit && itemToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [itemToEdit]);

  const deleteAction = (id) => {
    EspecialistaService.deleteEspecialista(id)
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
    const found = especialistas.find((rol) => rol.id === Number(id));
    setItemToEdit(found);
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
        rows={especialistas}
        headers={headers}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearEspecialista
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <ToastContainer />
    </>
  );
};

export default Especialistas;
