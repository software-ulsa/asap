import { createSlice } from "@reduxjs/toolkit";
import {
  createCurso,
  deleteCurso,
  deleteManyCurso,
  getAllCurso,
  updateCurso,
} from "../services/CursoService";

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
        state.cursos.push(action.payload.curso);
      })
      .addCase(createCurso.rejected, (state) => {
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
        var foundIndex = state.cursos.findIndex(
          (curso) => curso.id === action.payload.curso.id
        );
        state.cursos[foundIndex] = action.payload.curso;
      })
      .addCase(updateCurso.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteCurso.fulfilled, (state, action) => {
        var foundIndex = state.cursos.findIndex(
          (curso) => curso.id === action.payload.id
        );
        state.cursos.splice(foundIndex, 1);
      })
      .addCase(deleteCurso.rejected, (state) => {
        state.error = true;
      });
    builder
      .addCase(deleteManyCurso.fulfilled, (state, action) => {
        state.cursos = state.cursos.filter(
          (curso) => !action.payload.ids.find((rm) => rm === curso.id)
        );
      })
      .addCase(deleteManyCurso.rejected, (state) => {
        state.error = true;
      });
  },
});

export default cursosSlice.reducer;
