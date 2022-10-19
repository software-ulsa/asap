import { useCallback, useEffect, useState } from "react";
import SuperDataTable from "../../components/SuperDataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import PublicidadService from "../../services/PublicidadService";

import CrearPublicidad from "./CrearPublicidad";
import EditarPublicidad from "./EditarPublicidad";

import { useStyles } from "../../utils/utils";

const Publicidades = () => {
  const classes = useStyles();

  const [publicidades, setPublicidades] = useState([]);
  const [itemId, setItemId] = useState(-1);
  const [itemToEdit, setItemToEdit] = useState({ id: -1 });

  const [fetched, setFetched] = useState(false);
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
      name: "dot_empresa",
      label: "Empresa",
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
      name: "email",
      label: "Correo",
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

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => publicidades[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      PublicidadService.deletePublicidad(idsToDelete[0])
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
      PublicidadService.deleteManyPublicidad(idsToDelete)
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
    const idsToDelete = ids.data.map((d) => publicidades[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      const id = idsToDelete[0];
      const found = publicidades.find(
        (publicidad) => publicidad.id === Number(id)
      );
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
      <SuperDataTable
        data={publicidades}
        headers={headers}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearPublicidad
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarPublicidad
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        publicidad={itemToEdit}
      />
      <ToastContainer />
    </>
  );
};

export default Publicidades;
