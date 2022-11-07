import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenEdit } from "../../../reducers/ModalReducer";

import { Helmet } from "react-helmet";

import SuperDataTable from "../../../components/SuperDataTable";
import { notify } from "../../../utils/utils";
import { carreraHeaders } from "../../../utils/headers";

import {
  deleteManyCarrera,
  deleteCarrera,
  getAllCarreras,
} from "../../../services/CarreraService";

import CrearCarrera from "./CrearCarrera";
import EditarCarrera from "./EditarCarrera";

const Carreras = () => {
  const dispatch = useDispatch();
  const { carreras, fetched } = useSelector((state) => state.carreras);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = carreras.find((carrera) => carrera.id === Number(itemId));

  const refreshAction = () => {
    dispatch(getAllCarreras());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => carreras[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deleteCarrera(idsToDelete[0]));
    } else if (idsToDelete.length >= 1) {
      dispatch(deleteManyCarrera(idsToDelete));
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => carreras[d.dataIndex].id);
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
        <title>Carreras - ASAP</title>
        <meta name="Carreras" content="Carreras registradas" />
      </Helmet>

      <SuperDataTable
        data={carreras}
        title={"Registros"}
        headers={carreraHeaders}
        fetched={fetched}
        refreshAction={refreshAction}
        deleteAction={deleteAction}
        editAction={editAction}
      />

      <CrearCarrera />

      <EditarCarrera carrera={itemToEdit} />
    </>
  );
};

export default Carreras;
