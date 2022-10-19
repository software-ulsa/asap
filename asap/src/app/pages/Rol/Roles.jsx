import { useCallback, useEffect, useState } from "react";
import SuperDataTable from "../../components/SuperDataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import RolService from "../../services/RolService";

import CrearRol from "./CrearRol";
import EditarRol from "./EditarRol";

import { useStyles } from "../../utils/utils";

const Roles = () => {
  const classes = useStyles();

  const [roles, setRoles] = useState([]);
  const [fetched, setFetched] = useState(false);

  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

  const headers = [
    {
      name: "",
      label: "No.",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, update) => {
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <center>{rowIndex}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "id",
      label: "Id",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "nombre",
      label: "Nombre",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
    {
      name: "descripcion",
      label: "Descripción",
      options: {
        customBodyRender: (data, type, row) => {
          return <center>{data}</center>;
        },
        setCellHeaderProps: () => ({
          className: classes.centeredHeader,
        }),
      },
    },
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
    if (itemToEdit && itemToEdit.id !== -1) {
      handleOpenEdit();
    }
  }, [itemToEdit]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => roles[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      RolService.deleteRol(idsToDelete[0])
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
    } else if (idsToDelete.length >= 1) {
      RolService.deleteManyRol(idsToDelete)
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
    }
  };

  const editAction = (ids) => {
    const idsToDelete = ids.data.map((d) => roles[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      const id = idsToDelete[0];
      const found = roles.find((rol) => rol.id === Number(id));
      setItemId(id);
      setItemToEdit(found);
      handleOpenEdit();
    } else {
      toast.error("Solo se puede editar un elemento a la vez", {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      });
    }
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
      <SuperDataTable
        data={roles}
        headers={headers}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
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
        rol={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Roles;
