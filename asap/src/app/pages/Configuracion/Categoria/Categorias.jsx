import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../../reducers/ModalReducer";

import { Helmet } from "react-helmet";

import SuperDataTable from "../../../components/SuperDataTable";
import { notify } from "../../../utils/utils";
import { categoriaHeaders } from "../../../utils/headers";

import {
  deleteManyCategoria,
  deleteCategoria,
  getAllCategorias,
} from "../../../services/CategoriaService";

import CrearCategoria from "./CrearCategoria";
import EditarCategoria from "./EditarCategoria";

const Categorias = () => {
  const dispatch = useDispatch();
  const { categorias, fetched } = useSelector((state) => state.categorias);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = categorias.find(
    (categoria) => categoria.id === Number(itemId)
  );

  const refreshAction = () => {
    dispatch(getAllCategorias());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => categorias[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteCategoria(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyCategoria(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => categorias[d.dataIndex].id);
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
        <title>Categorias - ASAP</title>
        <meta name="Categorias" content="Categorias registrados" />
      </Helmet>

      <SuperDataTable
        data={categorias}
        title={"Registros"}
        headers={categoriaHeaders}
        fetched={fetched}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearCategoria />

      <EditarCategoria categoria={itemToEdit} />
    </>
  );
};

export default Categorias;
