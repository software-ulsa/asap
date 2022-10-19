import { useCallback, useEffect, useState } from "react";
import SuperDataTable from "../../components/SuperDataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import NotaService from "../../services/NotaService";

import CrearNota from "./Crear/CrearNota";
import EditarNota from "./Editar/EditarNota";

import { useStyles } from "../../utils/utils";

const Notas = () => {
  const classes = useStyles();

  const [notas, setNotas] = useState([]);
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
      name: "titulo",
      label: "Titulo",
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
      name: "tema",
      label: "Tema",
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
      NotaService.getAllNotas()
        .then((response) => {
          setNotas(response);
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
    NotaService.deleteNota(id)
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
    const found = notas.find((nota) => nota.id === Number(id));
    setItemToEdit(found);
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
        data={notas}
        headers={headers}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />
      <CrearNota
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
      <EditarNota
        handleClose={handleCloseEdit}
        open={openEdit}
        notify={notify}
        nota={itemToEdit}
      />      
      <ToastContainer />
    </>
  );
};

export default Notas;
