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

import { handleOpenCreate, handleOpenEdit, handleClose } from "../../reducers/ModalReducer";

const Publicidades = () => {
  const dispatch = useDispatch();
  const { publicidades, fetched } = useSelector((state) => state.publicidades);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = publicidades.find((publicidad) => publicidad.id === Number(itemId));

  const { openCreate, openEdit } = useSelector((state) => state.modal);

  const refreshAction = () => {
    dispatch(getAllPublicidad());
  };

  useEffect(() => {
    refreshAction();
  }, []);

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
      dispatch(handleOpenEdit());
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

      <SuperDataTable
        data={publicidades}
        title={"Publicidades"}
        headers={publicidadHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
        refreshAction={refreshAction}
      />

      <CrearPublicidad handleClose={() => dispatch(handleClose())} open={openCreate} />

      <EditarPublicidad
        handleClose={() => dispatch(handleClose())}
        open={openEdit}
        publicidad={itemToEdit}
      />
    </>
  );
};

export default Publicidades;
