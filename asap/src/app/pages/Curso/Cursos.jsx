import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperDataTable from "../../components/SuperDataTable";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

import CursoService from "../../services/CursoService";

import CrearCurso from "./CrearCurso";
import { useStyles } from "../../utils/utils";

const Cursos = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [cursos, setCursos] = useState([]);
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
        });
    }
  }, [fetched, notify]);

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
    const found = cursos.find((curso) => curso.id === Number(id));
    navigate("/editar-curso", { state: { item: found } });
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
      <SuperDataTable
        data={cursos}
        headers={headers}
        fetched={fetched}
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
