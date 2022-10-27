import { createSlice } from "@reduxjs/toolkit";
import {
  createActividad,
  deleteManyActividad,
  deleteActividad,
  updateActividad,
  getAllActividadByCursoId,
} from "../services/ActividadService";
import { getCursoById, updateCurso } from "../services/CursoService";

const initialState = {
  curso: {},
  actividades: [],
  fetched: false,
  error: false,
};

export const actividadesSlice = createSlice({
  name: "actividades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCursoById.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getCursoById.fulfilled, (state, action) => {
        state.fetched = true;
        state.curso = action.payload;
      })
      .addCase(getCursoById.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateCurso.fulfilled, (state, action) => {
        state.curso = action.payload;
      })
      .addCase(updateCurso.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(createActividad.fulfilled, (state, action) => {
        state.actividades.push(action.payload.actividad);
      })
      .addCase(createActividad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(getAllActividadByCursoId.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllActividadByCursoId.fulfilled, (state, action) => {
        state.fetched = true;
        state.actividades = action.payload.actividades;
      })
      .addCase(getAllActividadByCursoId.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateActividad.fulfilled, (state, action) => {
        var foundIndex = state.actividades.findIndex(
          (actividad) => actividad.id === action.payload.actividad.id
        );
        state.actividades[foundIndex] = action.payload.actividad;
      })
      .addCase(updateActividad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteActividad.fulfilled, (state, action) => {
        var foundIndex = state.actividades.findIndex(
          (actividad) => actividad.id === action.payload.id
        );
        state.actividades.splice(foundIndex, 1);
      })
      .addCase(deleteActividad.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteManyActividad.fulfilled, (state, action) => {
        state.actividades = state.actividades.filter(
          (actividad) => !action.payload.ids.find((rm) => rm === actividad.id)
        );
      })
      .addCase(deleteManyActividad.rejected, (state) => {
        state.error = true;
      });
  },
});

export default actividadesSlice.reducer;
