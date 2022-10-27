import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { publicidadHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteManyPublicidad,
  deletePublicidad,
  getAllPublicidad,
} from "../../services/PublicidadService";

import CrearPublicidad from "./CrearPublicidad";
import EditarPublicidad from "./EditarPublicidad";

const Publicidades = () => {
  const dispatch = useDispatch();
  const { publicidades, fetched } = useSelector((state) => state.publicidades);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = publicidades.find(
    (publicidad) => publicidad.id === Number(itemId)
  );

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllPublicidad());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => publicidades[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deletePublicidad(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyPublicidad(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => publicidades[d.dataIndex].id);
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
        headers={publicidadHeaders}
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
    </>
  );
};

export default Publicidades;
