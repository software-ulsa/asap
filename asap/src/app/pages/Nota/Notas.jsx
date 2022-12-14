import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../reducers/ModalReducer";

import { Helmet } from "react-helmet";
import SuperDataTable from "../../components/SuperDataTable";

import { notaHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import {
  deleteManyNota,
  deleteNota,
  getAllNotas,
} from "../../services/NotaService";

import CrearNota from "./CrearNota";
import EditarNota from "./EditarNota";

const Notas = () => {
  const dispatch = useDispatch();
  const { notas, fetched } = useSelector((state) => state.notas);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = notas.find((nota) => nota.id === Number(itemId));

  const refreshAction = () => {
    dispatch(getAllNotas());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => notas[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteNota(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyNota(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => notas[d.dataIndex].id);
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
        <title>Notas - ASAP</title>
        <meta name="Notas" content="Notas registradas" />
      </Helmet>

      <SuperDataTable
        data={notas}
        title={"Notas"}
        headers={notaHeaders}
        fetched={fetched}
        deleteAction={deleteAction}
        editAction={editAction}
        refreshAction={refreshAction}
        tableButtons="NOTA"
      />

      <CrearNota />

      <EditarNota note={itemToEdit} />
    </>
  );
};

export default Notas;
