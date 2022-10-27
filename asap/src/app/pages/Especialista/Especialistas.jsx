import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { especialistaHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteEspecialista,
  deleteManyEspecialista,
  getAllEspecialista,
} from "../../services/EspecialistaService";

import CrearEspecialista from "./CrearEspecialista";
import EditarEspecialista from "./EditarEspecialista";

const Especialistas = () => {
  const dispatch = useDispatch();
  const { especialistas, fetched, error } = useSelector(
    (state) => state.especialistas
  );

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = especialistas.find(
    (especialista) => especialista.id === Number(itemId)
  );

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllEspecialista());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => especialistas[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteEspecialista(idsToDelete[0]));
      error
        ? notify("error", "No se eliminó el especialista")
        : notify("success", "Se eliminó el especialista");
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyEspecialista(idsToDelete));
      error
        ? notify("error", "No se eliminaron los especialistas")
        : notify("success", "Especialistas eliminados");
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => especialistas[d.dataIndex].id);
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

      <SuperDataTable
        data={especialistas}
        headers={especialistaHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearEspecialista handleClose={handleCloseCreate} open={openCreate} />

      <EditarEspecialista
        handleClose={handleCloseEdit}
        open={openEdit}
        specialist={itemToEdit}
      />
    </>
  );
};

export default Especialistas;
