import { useCallback, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import UsuarioService from "../../services/UsuarioService";

import CrearUsuario from "./CrearUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
    { field: "correo", label: "Correo" },
    { field: "telefono", label: "Teléfono" },
    { field: "rol", subfield: "nombre", label: "Rol" },
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
      UsuarioService.getAllUsers()
        .then((response) => {
          setUsuarios(response);
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
    UsuarioService.deleteUser(id)
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
    const found = usuarios.find((rol) => rol.id === Number(id));
    setItemId(id);
    setItemToEdit(found);
    handleOpenEdit();
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
        rows={usuarios}
        headers={headers}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearUsuario
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <ToastContainer />
    </>
  );
};

export default Usuarios;
