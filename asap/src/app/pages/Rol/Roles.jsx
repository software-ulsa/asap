import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Helmet } from "react-helmet";

import SuperDataTable from "../../components/SuperDataTable";
import { notify } from "../../utils/utils";
import { rolHeaders } from "../../utils/headers";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteManyRol,
  deleteRol,
  getAllRoles,
} from "../../services/RolService";

import CrearRol from "./CrearRol";
import EditarRol from "./EditarRol";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, fetched } = useSelector((state) => state.roles);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = roles.find((rol) => rol.id === Number(itemId));

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllRoles());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => roles[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteRol(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyRol(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => roles[d.dataIndex].id);
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
        headers={rolHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearRol handleClose={handleCloseCreate} open={openCreate} />

      <EditarRol
        handleClose={handleCloseEdit}
        open={openEdit}
        rol={itemToEdit}
      />
    </>
  );
};

export default Roles;
