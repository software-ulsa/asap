import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../../reducers/ModalReducer";

import { Helmet } from "react-helmet";

import SuperDataTable from "../../../components/SuperDataTable";
import { notify } from "../../../utils/utils";
import { rolHeaders } from "../../../utils/headers";

import {
  deleteManyRol,
  deleteRol,
  getAllRoles,
} from "../../../services/RolService";

import CrearRol from "./CrearRol";
import EditarRol from "./EditarRol";

const Roles = () => {
  const dispatch = useDispatch();
  const { roles, fetched } = useSelector((state) => state.roles);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = roles.find((rol) => rol.id === Number(itemId));

  const refreshAction = () => {
    dispatch(getAllRoles());
  };

  useEffect(() => {
    refreshAction();
  }, []);

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
      dispatch(handleOpenEdit());
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

      <SuperDataTable
        data={roles}
        title={"Registros"}
        headers={rolHeaders}
        fetched={fetched}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearRol />

      <EditarRol rol={itemToEdit} />
    </>
  );
};

export default Roles;
