import { createSlice } from "@reduxjs/toolkit";
import {
  createPublicidad,
  deleteManyPublicidad,
  deletePublicidad,
  getAllPublicidad,
  updatePublicidad,
} from "../services/PublicidadService";

const initialState = {
  publicidades: [],
  fetched: false,
  error: false,
};

export const publicidadesSlice = createSlice({
  name: "publicidades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPublicidad.fulfilled, (state, action) => {
        state.publicidades.push(action.payload.publicidad);
      })
      .addCase(createPublicidad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(getAllPublicidad.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllPublicidad.fulfilled, (state, action) => {
        state.fetched = true;
        state.publicidades = action.payload;
      })
      .addCase(getAllPublicidad.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updatePublicidad.fulfilled, (state, action) => {
        var foundIndex = state.publicidades.findIndex(
          (publicidad) => publicidad.id === action.payload.publicidad.id
        );
        state.publicidades[foundIndex] = action.payload.publicidad;
      })
      .addCase(updatePublicidad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deletePublicidad.fulfilled, (state, action) => {
        var foundIndex = state.publicidades.findIndex(
          (publicidad) => publicidad.id === action.payload.id
        );
        state.publicidades.splice(foundIndex, 1);
      })
      .addCase(deletePublicidad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteManyPublicidad.fulfilled, (state, action) => {
        state.publicidades = state.publicidades.filter(
          (publicidad) => !action.payload.ids.find((rm) => rm === publicidad.id)
        );
      })
      .addCase(deleteManyPublicidad.rejected, (state) => {
        state.error = true;
      });
  },
});

export default publicidadesSlice.reducer;
