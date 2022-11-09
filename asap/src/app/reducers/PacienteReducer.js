import { createSlice } from "@reduxjs/toolkit";
import {
  createPaciente,
  deletePaciente,
  deleteManyPaciente,
  getAllPaciente,
  updatePaciente,
} from "../services/PacienteService";
import { notify } from "../utils/utils";

const initialState = {
  pacientes: [],
  fetched: false,
  error: false,
};

export const pacientesSlice = createSlice({
  name: "pacientes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPaciente.fulfilled, (state, action) => {
        notify("success", "Se agregó el paciente");
        state.pacientes.push(action.payload.paciente);
      })
      .addCase(createPaciente.rejected, (state) => {
        notify("error", "Hubo un error al agregar el paciente");
        state.error = true;
      });
    builder
      .addCase(getAllPaciente.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllPaciente.fulfilled, (state, action) => {
        state.fetched = true;
        state.pacientes = action.payload;
      })
      .addCase(getAllPaciente.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updatePaciente.fulfilled, (state, action) => {
        notify("success", "Se actualizó el paciente");
        var foundIndex = state.pacientes.findIndex(
          (paciente) => paciente.id === action.payload.paciente.id
        );
        state.pacientes[foundIndex] = action.payload.paciente;
      })
      .addCase(updatePaciente.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el paciente");
        state.error = true;
      });
    builder
      .addCase(deletePaciente.fulfilled, (state, action) => {
        var foundIndex = state.pacientes.findIndex(
          (paciente) => paciente.id === Number(action.payload.id)
        );
        notify("success", "Se eliminó el paciente");
        state.pacientes.splice(foundIndex, 1);
      })
      .addCase(deletePaciente.rejected, (state) => {
        notify("error", "Hubo un error al eliminar el paciente");
        state.error = true;
      });
    builder
      .addCase(deleteManyPaciente.fulfilled, (state, action) => {
        notify("success", "Pacientes eliminados");
        state.pacientes = state.pacientes.filter(
          (paciente) => !action.payload.ids.find((rm) => rm === paciente.id)
        );
      })
      .addCase(deleteManyPaciente.rejected, (state) => {
        notify("error", "Hubo un error al eliminar los pacientes");
        state.error = true;
      });
  },
});

export default pacientesSlice.reducer;
