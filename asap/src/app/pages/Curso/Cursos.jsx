import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../reducers/ModalReducer";

import SuperDataTable from "../../components/SuperDataTable";
import { cursoHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import {
  deleteCurso,
  deleteManyCurso,
  getAllCurso,
} from "../../services/CursoService";

import CrearCurso from "./CrearCurso";
import EditarCurso from "./EditarCurso";

const Cursos = () => {
  const dispatch = useDispatch();
  const { cursos, fetched } = useSelector((state) => state.cursos);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = cursos.find((curso) => curso.id === Number(itemId));

  const refreshAction = () => {
    dispatch(getAllCurso());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => cursos[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteCurso(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyCurso(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => cursos[d.dataIndex].id);
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
        <title>Cursos - ASAP</title>
        <meta name="Cursos" content="Cursos registrados" />
      </Helmet>

      <SuperDataTable
        data={cursos}
        title={"Cursos"}
        fetched={fetched}
        headers={cursoHeaders}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
        tableButtons="CURSO"
      />

      <CrearCurso />

      <EditarCurso course={itemToEdit} />
    </>
  );
};

export default Cursos;
