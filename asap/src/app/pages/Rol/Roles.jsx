import { useCallback, useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Button, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "../../components/DataTable";
import RolService from "../../services/RolService";
import CrearRol from "./CrearRol";
import EditarRol from "./EditarRol";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [rolToEdit, setRolToEdit] = useState({
    id: -1,
  });
  const [fetched, setFetched] = useState(false);
  const headers = [
    { field: "id", label: "No." },
    { field: "nombre", label: "Nombre" },
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
      RolService.getAllRoles()
        .then((response) => {
          setRoles(response);
          setFetched(true);
        })
        .catch((error) => {
          setFetched(true);
        });
    }
  }, [fetched, notify]);

  useEffect(() => {
    if (rolToEdit && rolToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [rolToEdit]);

  const deleteAction = (id) => {
    RolService.deleteRol(id)
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
    const found = roles.find((rol) => rol.id === Number(id));
    setRolToEdit(found);
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
            onClick={handleOpenCreate}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
      <DataTable
        rows={roles}
        headers={headers}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      <CrearRol
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarRol
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        rol={rolToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Roles;
