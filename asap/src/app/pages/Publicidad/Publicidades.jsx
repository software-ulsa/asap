import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import PublicidadService from "../../services/PublicidadService";

import CrearPublicidad from "./CrearPublicidad";

const Publicidades = () => {
  const [publicidades, setPublicidades] = useState([]);
  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "dot_empresa", label: "Empresa" },
    { field: "email", label: "Correo" },

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
      PublicidadService.getAllPublicidad()
        .then((response) => {
          setPublicidades(response);
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
    PublicidadService.deletePublicidad(id)
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
    const found = publicidades.find((rol) => rol.id === Number(id));
    setItemToEdit(found);
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
        rows={publicidades}
        headers={headers}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearPublicidad
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />

      <ToastContainer />
    </>
  );
};

export default Publicidades;
