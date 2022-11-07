import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../../reducers/ModalReducer";

import { Helmet } from "react-helmet";

import SuperDataTable from "../../../components/SuperDataTable";
import { notify } from "../../../utils/utils";
import { especialidadHeaders } from "../../../utils/headers";

import {
  deleteManyEspecialidad,
  deleteEspecialidad,
  getAllEspecialidades,
} from "../../../services/EspecialidadService";

import CrearEspecialidad from "./CrearEspecialidad";
import EditarEspecialidad from "./EditarEspecialidad";

const Especialidades = () => {
  const dispatch = useDispatch();
  const { especialidades, fetched } = useSelector(
    (state) => state.especialidades
  );

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = especialidades.find(
    (especialidad) => especialidad.id === Number(itemId)
  );

  const refreshAction = () => {
    dispatch(getAllEspecialidades());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => especialidades[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteEspecialidad(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyEspecialidad(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => especialidades[d.dataIndex].id);
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
        <title>Especialidades - ASAP</title>
        <meta name="Especialidades" content="Especialidades registrados" />
      </Helmet>

      <SuperDataTable
        data={especialidades}
        title={"Registros"}
        headers={especialidadHeaders}
        fetched={fetched}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearEspecialidad />

      <EditarEspecialidad especialidad={itemToEdit} />
    </>
  );
};

export default Especialidades;
