import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { usuarioHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import { deleteUser, getAllUsers } from "../../services/UsuarioService";

import CrearUsuario from "./CrearUsuario";
import EditarUsuario from "./EditarUsuario";

import { handleOpenEdit } from "../../reducers/ModalReducer";

const Usuarios = () => {
  const dispatch = useDispatch();
  const { usuarios, fetched } = useSelector((state) => state.usuarios);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = usuarios.find((usuario) => usuario.id === Number(itemId));

  const refreshAction = () => {
    dispatch(getAllUsers());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => usuarios[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteUser(idsToDelete[0]));
    } else {
      notify("error", "Solo se puede eliminar un elemento a la vez");
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => usuarios[d.dataIndex].id);
    if (idsToEdit.length === 1) {
      setItemId(idsToEdit[0]);
      dispatch(handleOpenEdit());
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

      <SuperDataTable
        data={usuarios}
        title={"Usuarios"}
        fetched={fetched}
        headers={usuarioHeaders}
        refreshAction={refreshAction}
        editAction={editAction}
        deleteAction={deleteAction}
      />

      <CrearUsuario />

      <EditarUsuario user={itemToEdit} />
    </>
  );
};

export default Usuarios;
