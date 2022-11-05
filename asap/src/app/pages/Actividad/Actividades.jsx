import { useState } from "react";
import { useDispatch } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";

import {
  deleteActividad,
  deleteManyActividad,
} from "../../services/ActividadService";

import EditarActividad from "./EditarActividad";

import { notify } from "../../utils/utils";
import { actividadHeaders } from "../../utils/headers";

const ActividadItem = ({ actividades, fetched }) => {
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(-1);
  const itemToEdit = actividades.find((nota) => nota.id === Number(itemId));

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => actividades[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteActividad(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyActividad(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => actividades[d.dataIndex].id);
    if (idsToEdit.length === 1) {
      setItemId(idsToEdit[0]);
      handleOpenEdit();
    } else {
      notify("error", "Solo se puede editar un elemento a la vez");
    }
  };

  return (
    <>
      <SuperDataTable
        data={actividades}
        headers={actividadHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <EditarActividad
        open={openEdit}
        actividad={itemToEdit}
        handleClose={handleCloseEdit}
      />
    </>
  );
};

export default ActividadItem;
