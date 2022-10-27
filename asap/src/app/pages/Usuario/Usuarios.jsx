import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { usuarioHeaders } from "../../utils/headers";

import { Helmet } from "react-helmet";

import { Button, Grid, Typography } from "@mui/material";

import {
  deleteManyUser,
  deleteUser,
  getAllUsers,
} from "../../services/UsuarioService";

import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";

import { notify } from "../../utils/utils";
import { emptyUser } from "../../utils/initialStates";

const Usuarios = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { usuarios, fetched } = useSelector((state) => state.usuarios);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = usuarios.find((user) => user.id === Number(itemId));

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllUsers());
    }
  }, [fetched, dispatch]);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => usuarios[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      const id = idsToDelete[0];
      if (currentUser.id === id) {
        notify("error", "No se puede eliminar este usuario");
      } else {
        dispatch(deleteUser(idsToDelete[0]));
      }
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyUser(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => usuarios[d.dataIndex].id);
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
        <title>Usuarios - ASAP</title>
        <meta name="Usuarios" content="Usuarios registrados" />
      </Helmet>
      <Grid container paddingBottom={2}>
        <Grid item xs={10}>
          <Typography variant="h4" fontWeight="bold">
            Usuarios
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
        data={usuarios}
        headers={usuarioHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearUsuario
        handleClose={handleCloseCreate}
        user={emptyUser}
        open={openCreate}
        mode={true}
      />

      <EditarUsuario
        handleClose={handleCloseEdit}
        user={itemToEdit}
        open={openEdit}
        mode={false}
      />
    </>
  );
};

export default Usuarios;
