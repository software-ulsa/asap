import { createSlice } from "@reduxjs/toolkit";
import {
  createEspecialista,
  deleteEspecialista,
  deleteManyEspecialista,
  getAllEspecialista,
  updateEspecialista,
} from "../services/EspecialistaService";

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
        state.especialistas.push(action.payload.especialista);
      })
      .addCase(createEspecialista.rejected, (state) => {
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
        var foundIndex = state.especialistas.findIndex(
          (especialista) => especialista.id === action.payload.especialista.id
        );
        state.especialistas[foundIndex] = action.payload.especialista;
      })
      .addCase(updateEspecialista.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteEspecialista.fulfilled, (state, action) => {
        var foundIndex = state.especialistas.findIndex(
          (especialista) => especialista.id === action.payload.id
        );
        state.especialistas.splice(foundIndex, 1);
      })
      .addCase(deleteEspecialista.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteManyEspecialista.fulfilled, (state, action) => {
        state.especialistas = state.especialistas.filter(
          (especialista) =>
            !action.payload.ids.find((rm) => rm === especialista.id)
        );
      })
      .addCase(deleteManyEspecialista.rejected, (state) => {
        state.error = true;
      });
  },
});

export default especialistasSlice.reducer;
