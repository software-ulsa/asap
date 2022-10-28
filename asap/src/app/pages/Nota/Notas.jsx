import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { notaHeaders } from "../../utils/headers";

import { Helmet } from "react-helmet";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteManyNota,
  deleteNota,
  getAllNotas,
} from "../../services/NotaService";

import CrearNota from "./CrearNota";
import EditarNota from "./EditarNota";
import { notify } from "../../utils/utils";

const Notas = () => {
  const dispatch = useDispatch();
  const { notas, fetched } = useSelector((state) => state.notas);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = notas.find((nota) => nota.id === Number(itemId));
  console.log(itemToEdit);

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllNotas());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => notas[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteNota(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyNota(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => notas[d.dataIndex].id);
    if (idsToEdit.length === 1) {
      setItemId(idsToEdit[0]);
      handleOpenEdit();
    } else {
      notify("error", "Solo se puede editar un elemento a la vez");
    }
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
        headers={notaHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearNota handleClose={handleCloseCreate} open={openCreate} />

      <EditarNota
        handleClose={handleCloseEdit}
        open={openEdit}
        note={itemToEdit}
      />
    </>
  );
};

export default Notas;
