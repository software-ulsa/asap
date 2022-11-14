import { createSlice } from "@reduxjs/toolkit";
import {
  acceptNota,
  createNota,
  deleteManyNota,
  deleteNota,
  getAllNotas,
  rejectNota,
  updateNota,
} from "../services/NotaService";
import { notify } from "../utils/utils";

const initialState = {
  notas: [],
  fetched: false,
  error: false,
};

export const notasSlice = createSlice({
  name: "notas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNota.fulfilled, (state, action) => {
        notify("success", "Se agregó la nota");
        state.notas.push(action.payload.nota);
      })
      .addCase(createNota.rejected, (state) => {
        notify("error", "Hubo un error al agregar la nota");
        state.error = true;
      });
    builder
      .addCase(getAllNotas.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllNotas.fulfilled, (state, action) => {
        state.fetched = true;
        state.notas = action.payload;
      })
      .addCase(getAllNotas.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateNota.fulfilled, (state, action) => {
        notify("success", "Se actualizó la nota");
        const foundIndex = state.notas.findIndex(
          (nota) => nota.id === action.payload.nota.id
        );
        state.notas[foundIndex] = action.payload.nota;
      })
      .addCase(updateNota.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la nota");
        state.error = true;
      });
    builder
      .addCase(acceptNota.fulfilled, (state, action) => {
        notify("success", "Nota aceptada");
        const foundIndex = state.notas.findIndex(
          (nota) => nota.id === action.payload.nota.id
        );
        state.notas[foundIndex] = action.payload.nota;
      })
      .addCase(acceptNota.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la nota");
        state.error = true;
      });
    builder
      .addCase(rejectNota.fulfilled, (state, action) => {
        notify("success", "Nota rechazada");
        const foundIndex = state.notas.findIndex(
          (nota) => nota.id === action.payload.nota.id
        );
        state.notas[foundIndex] = action.payload.nota;
      })
      .addCase(rejectNota.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la nota");
        state.error = true;
      });
    builder
      .addCase(deleteNota.fulfilled, (state, action) => {
        const foundIndex = state.notas.findIndex(
          (nota) => nota.id === Number(action.payload.id)
        );
        notify("success", "Se eliminó la nota");
        state.notas.splice(foundIndex, 1);
      })
      .addCase(deleteNota.rejected, (state) => {
        notify("error", "Hubo un error al eliminar la nota");
        state.error = true;
      });
    builder
      .addCase(deleteManyNota.fulfilled, (state, action) => {
        notify("success", "Notas eliminadas");
        state.notas = state.notas.filter(
          (nota) => !action.payload.ids.find((rm) => rm === nota.id)
        );
      })
      .addCase(deleteManyNota.rejected, (state) => {
        notify("error", "Hubo un error al eliminar las notas");
        state.error = true;
      });
  },
});

export default notasSlice.reducer;
