import { createSlice } from "@reduxjs/toolkit";
import {
  createEspecialidad,
  deleteEspecialidad,
  deleteManyEspecialidad,
  getAllEspecialidades,
  updateEspecialidad,
} from "../services/EspecialidadService";
import { notify } from "../utils/utils";

const initialState = {
  especialidades: [],
  fetched: false,
  error: false,
};

export const especialidadesSlice = createSlice({
  name: "especialidades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEspecialidad.fulfilled, (state, action) => {
        notify("success", "Se agregó la especialidad");
        state.especialidades.push(action.payload.especialidad);
      })
      .addCase(createEspecialidad.rejected, (state) => {
        notify("error", "Hubo un error al agregar la especialidad");
        state.error = true;
      });
    builder
      .addCase(getAllEspecialidades.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllEspecialidades.fulfilled, (state, action) => {
        state.fetched = true;
        state.especialidades = action.payload;
      })
      .addCase(getAllEspecialidades.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateEspecialidad.fulfilled, (state, action) => {
        notify("success", "Rol actualizada");
        const foundIndex = state.especialidades.findIndex(
          (especialidad) => especialidad.id === action.payload.especialidad.id
        );
        state.especialidades[foundIndex] = action.payload.especialidad;
      })
      .addCase(updateEspecialidad.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la especialidad");
        state.error = true;
      });
    builder
      .addCase(deleteEspecialidad.fulfilled, (state, action) => {
        notify("success", "Se eliminó la especialidad");
        const foundIndex = state.especialidades.findIndex(
          (especialidad) => especialidad.id === Number(action.payload.id)
        );
        state.especialidades.splice(foundIndex, 1);
      })
      .addCase(deleteEspecialidad.rejected, (state) => {
        notify("error", "Hubo un error al eliminar la especialidad");
        state.error = true;
      });
    builder
      .addCase(deleteManyEspecialidad.fulfilled, (state, action) => {
        notify("success", "Especialidades eliminadas");
        state.especialidades = state.especialidades.filter(
          (especialidad) =>
            !action.payload.ids.find((rm) => rm === especialidad.id)
        );
      })
      .addCase(deleteManyEspecialidad.rejected, (state) => {
        notify("error", "Hubo un error al eliminar las especialidades");
        state.error = true;
      });
  },
});

export default especialidadesSlice.reducer;
