import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { cursoHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteCurso,
  deleteManyCurso,
  getAllCurso,
} from "../../services/CursoService";

import CrearCurso from "./CrearCurso";

const Cursos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cursos, fetched } = useSelector((state) => state.cursos);

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllCurso());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => cursos[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteCurso(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyCurso(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => cursos[d.dataIndex].id);
    if (idsToEdit.length === 1) {
      const id = idsToEdit[0];
      navigate("/editar-curso", { state: { id: id } });
    } else {
      notify("error", "Solo se puede editar un elemento a la vez");
    }
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
        headers={cursoHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearCurso
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
      />
    </>
  );
};

export default Cursos;
