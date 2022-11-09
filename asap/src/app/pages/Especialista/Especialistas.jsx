import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { especialistaHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import {
  deleteEspecialista,
  getAllEspecialista,
} from "../../services/EspecialistaService";

import CrearEspecialista from "./CrearEspecialista";
import EditarEspecialista from "./EditarEspecialista";

import { handleOpenEdit } from "../../reducers/ModalReducer";

const Especialistas = () => {
  const dispatch = useDispatch();
  const { especialistas, fetched } = useSelector(
    (state) => state.especialistas
  );

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = especialistas.find(
    (especialista) => especialista.id === Number(itemId)
  );

  const refreshAction = () => {
    dispatch(getAllEspecialista());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => especialistas[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteEspecialista(idsToDelete[0]));
    } else {
      notify("error", "Solo se puede eliminar un elemento a la vez");
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => especialistas[d.dataIndex].id);
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
        <title>Especialistas - ASAP</title>
        <meta name="Especialistas" content="Especialistas registrados" />
      </Helmet>

      <SuperDataTable
        data={especialistas}
        title={"Especialistas"}
        fetched={fetched}
        headers={especialistaHeaders}
        refreshAction={refreshAction}
        editAction={editAction}
        deleteAction={deleteAction}
      />

      <CrearEspecialista />

      <EditarEspecialista specialist={itemToEdit} />
    </>
  );
};

export default Especialistas;
