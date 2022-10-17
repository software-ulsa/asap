import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import EspecialistaService from "../../services/EspecialistaService";

import CrearEspecialista from "./Crear/CrearEspecialista";
import EditarEspecialista from "./Editar/EditarEspecialista";

const Especialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

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
    const found = especialistas.find(
      (especialista) => especialista.id === Number(id)
    );
    setItemId(id);
    setItemToEdit(found);
    handleOpenEdit();
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
      <EditarEspecialista
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        especialista={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Especialistas;
