import { createSlice } from "@reduxjs/toolkit";
import {
  createPublicidad,
  deleteManyPublicidad,
  deletePublicidad,
  getAllPublicidad,
  updatePublicidad,
} from "../services/PublicidadService";
import { notify } from "../utils/utils";

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
        notify("success", "Se agregó la publicidad");
        state.publicidades.push(action.payload.publicidad);
      })
      .addCase(createPublicidad.rejected, (state) => {
        notify("error", "Hubo un error al agregar la publicidad");
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
        notify("success", "Se actualizó la publicidad");
        const foundIndex = state.publicidades.findIndex(
          (publicidad) => publicidad.id === action.payload.publicidad.id
        );
        state.publicidades[foundIndex] = action.payload.publicidad;
      })
      .addCase(updatePublicidad.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la publicidad");
        state.error = true;
      });
    builder
      .addCase(deletePublicidad.fulfilled, (state, action) => {
        const foundIndex = state.publicidades.findIndex(
          (publicidad) => publicidad.id === Number(action.payload.id)
        );
        notify("success", "Se eliminó la publicidad");
        state.publicidades.splice(foundIndex, 1);
      })
      .addCase(deletePublicidad.rejected, (state) => {
        notify("error", "Hubo un error al eliminar la publicidad");
        state.error = true;
      });
    builder
      .addCase(deleteManyPublicidad.fulfilled, (state, action) => {
        notify("success", "Publicidades eliminadas");
        state.publicidades = state.publicidades.filter(
          (publicidad) => !action.payload.ids.find((rm) => rm === publicidad.id)
        );
      })
      .addCase(deleteManyPublicidad.rejected, (state) => {
        notify("error", "Hubo un error al eliminar las publicidades");
        state.error = true;
      });
  },
});

export default publicidadesSlice.reducer;
