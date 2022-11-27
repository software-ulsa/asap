import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../reducers/ModalReducer";

import SuperDataTable from "../../components/SuperDataTable";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import { notify } from "../../utils/utils";
import { actividadHeaders } from "../../utils/headers";

import {
  deleteActividad,
  deleteManyActividad,
  getAllActividadByCursoId,
} from "../../services/ActividadService";

import CrearActividad from "./CrearActividad";
import EditarActividad from "./EditarActividad";

const ActividadItem = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { actividades, fetched } = useSelector((state) => state.actividades);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = actividades.find(
    (actividad) => actividad.id === Number(itemId)
  );

  const refreshAction = () => {
    dispatch(getAllActividadByCursoId(state.item.id));
  };

  useEffect(() => {
    refreshAction();
  }, []);

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
      dispatch(handleOpenEdit());
    } else {
      notify("error", "Solo se puede editar un elemento a la vez");
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" marginBottom={3}>
          {`Curso: ${state.item.titulo}`}
        </Typography>
      </Box>
      <SuperDataTable
        data={actividades}
        title="Actividades"
        fetched={fetched}
        headers={actividadHeaders}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearActividad cursoId={state.item.id} />
      <EditarActividad activity={itemToEdit} cursoId={state.item.id} />
    </>
  );
};

export default ActividadItem;
