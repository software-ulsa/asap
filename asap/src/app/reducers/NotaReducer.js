import { createSlice } from "@reduxjs/toolkit";
import {
  createNota,
  deleteManyNota,
  deleteNota,
  getAllNotas,
  updateNota,
} from "../services/NotaService";

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
        state.notas.push(action.payload.nota);
      })
      .addCase(createNota.rejected, (state) => {
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
        var foundIndex = state.notas.findIndex(
          (nota) => nota.id === action.payload.nota.id
        );
        state.notas[foundIndex] = action.payload.nota;
      })
      .addCase(updateNota.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteNota.fulfilled, (state, action) => {
        var foundIndex = state.notas.findIndex(
          (nota) => nota.id === action.payload.id
        );
        state.notas.splice(foundIndex, 1);
      })
      .addCase(deleteNota.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteManyNota.fulfilled, (state, action) => {
        state.notas = state.notas.filter(
          (nota) => !action.payload.ids.find((rm) => rm === nota.id)
        );
      })
      .addCase(deleteManyNota.rejected, (state) => {
        state.error = true;
      });
  },
});

export default notasSlice.reducer;
