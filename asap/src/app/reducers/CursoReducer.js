import { createSlice } from "@reduxjs/toolkit";
import {
  createCurso,
  deleteCurso,
  deleteManyCurso,
  getAllCurso,
  updateCurso,
} from "../services/CursoService";
import { notify } from "../utils/utils";

const initialState = {
  cursos: [],
  fetched: false,
  error: false,
};

export const cursosSlice = createSlice({
  name: "cursos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCurso.fulfilled, (state, action) => {
        notify("success", "Se agregó el curso");
        state.cursos.push(action.payload.curso);
      })
      .addCase(createCurso.rejected, (state) => {
        notify("error", "Hubo un error al agregar el curso");
        state.error = true;
      });
    builder
      .addCase(getAllCurso.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllCurso.fulfilled, (state, action) => {
        state.fetched = true;
        state.cursos = action.payload;
      })
      .addCase(getAllCurso.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateCurso.fulfilled, (state, action) => {
        notify("success", "Se actualizó el curso");
        var foundIndex = state.cursos.findIndex(
          (curso) => curso.id === action.payload.curso.id
        );
        state.cursos[foundIndex] = action.payload.curso;
      })
      .addCase(updateCurso.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el curso");
        state.error = true;
      });
    builder
      .addCase(deleteCurso.fulfilled, (state, action) => {
        var foundIndex = state.cursos.findIndex(
          (curso) => curso.id === action.payload.id
        );
        notify("success", "Se eliminó el curso");
        state.cursos.splice(foundIndex, 1);
      })
      .addCase(deleteCurso.rejected, (state) => {
        notify("error", "Hubo un error al eliminar el curso");
        state.error = true;
      });
    builder
      .addCase(deleteManyCurso.fulfilled, (state, action) => {
        notify("success", "Cursos eliminados");
        state.cursos = state.cursos.filter(
          (curso) => !action.payload.ids.find((rm) => rm === curso.id)
        );
      })
      .addCase(deleteManyCurso.rejected, (state) => {
        notify("error", "Hubo un error al eliminar los cursos");
        state.error = true;
      });
  },
});

export default cursosSlice.reducer;
