import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SuperDataTable from "../../components/SuperDataTable";
import { pacienteHeaders } from "../../utils/headers";
import { notify } from "../../utils/utils";

import { Helmet } from "react-helmet";

import { deletePaciente, getAllPaciente } from "../../services/PacienteService";

import CrearPaciente from "./CrearPaciente";
import EditarPaciente from "./EditarPaciente";

import { handleOpenEdit } from "../../reducers/ModalReducer";

const Pacientes = () => {
  const dispatch = useDispatch();
  const { pacientes, fetched } = useSelector((state) => state.pacientes);

  const [itemId, setItemId] = useState(-1);
  const itemToEdit = pacientes.find(
    (paciente) => paciente.id === Number(itemId)
  );

  const refreshAction = () => {
    dispatch(getAllPaciente());
  };

  useEffect(() => {
    refreshAction();
  }, []);

  const deleteAction = (ids) => {
    const idsToDelete = ids.data.map((d) => pacientes[d.dataIndex].id);
    if (idsToDelete.length === 1) {
      dispatch(deletePaciente(idsToDelete[0]));
    } else {
      notify("error", "Solo se puede eliminar un elemento a la vez");
    }
  };

  const editAction = (ids) => {
    const idsToEdit = ids.data.map((d) => pacientes[d.dataIndex].id);
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
        <title>Pacientes - ASAP</title>
        <meta name="Pacientes" content="Pacientes registrados" />
      </Helmet>

      <SuperDataTable
        data={pacientes}
        title={"Pacientes"}
        fetched={fetched}
        headers={pacienteHeaders}
        refreshAction={refreshAction}
        editAction={editAction}
        deleteAction={deleteAction}
      />

      <CrearPaciente />

      <EditarPaciente pacient={itemToEdit} />
    </>
  );
};

export default Pacientes;
