import { createSlice } from "@reduxjs/toolkit";
import {
  createEspecialista,
  deleteEspecialista,
  deleteManyEspecialista,
  getAllEspecialista,
  updateEspecialista,
} from "../services/EspecialistaService";
import { notify } from "../utils/utils";

const initialState = {
  especialistas: [],
  fetched: false,
  error: false,
};

export const especialistasSlice = createSlice({
  name: "especialistas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEspecialista.fulfilled, (state, action) => {
        notify("success", "Se agregó el especialista");
        state.especialistas.push(action.payload.especialista);
      })
      .addCase(createEspecialista.rejected, (state) => {
        notify("error", "Hubo un error al agregar el especialista");
        state.error = true;
      });
    builder
      .addCase(getAllEspecialista.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllEspecialista.fulfilled, (state, action) => {
        state.fetched = true;
        state.especialistas = action.payload;
      })
      .addCase(getAllEspecialista.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateEspecialista.fulfilled, (state, action) => {
        notify("success", "Se actualizó el especialista");
        var foundIndex = state.especialistas.findIndex(
          (especialista) => especialista.id === action.payload.especialista.id
        );
        state.especialistas[foundIndex] = action.payload.especialista;
      })
      .addCase(updateEspecialista.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el especialista");
        state.error = true;
      });
    builder
      .addCase(deleteEspecialista.fulfilled, (state, action) => {
        var foundIndex = state.especialistas.findIndex(
          (especialista) => especialista.id === Number(action.payload.id)
        );
        notify("success", "Se eliminó el especialista");
        state.especialistas.splice(foundIndex, 1);
      })
      .addCase(deleteEspecialista.rejected, (state) => {
        notify("error", "Hubo un error al eliminar el especialista");
        state.error = true;
      });
    builder
      .addCase(deleteManyEspecialista.fulfilled, (state, action) => {
        notify("success", "Especialistas eliminados");
        state.especialistas = state.especialistas.filter(
          (especialista) =>
            !action.payload.ids.find((rm) => rm === especialista.id)
        );
      })
      .addCase(deleteManyEspecialista.rejected, (state) => {
        notify("error", "Hubo un error al eliminar los especialistas");
        state.error = true;
      });
  },
});

export default especialistasSlice.reducer;
