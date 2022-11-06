import { createSlice } from "@reduxjs/toolkit";
import {
  createCategoria,
  deleteManyCategoria,
  deleteCategoria,
  getAllCategorias,
  updateCategoria,
} from "../services/CategoriaService";
import { notify } from "../utils/utils";

const initialState = {
  categorias: [],
  fetched: false,
  error: false,
};

export const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoria.fulfilled, (state, action) => {
        notify("success", "Se agregó la categoria");
        state.categorias.push(action.payload.categoria);
      })
      .addCase(createCategoria.rejected, (state) => {
        notify("error", "Hubo un error al agregar la categoria");
        state.error = true;
      });
    builder
      .addCase(getAllCategorias.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllCategorias.fulfilled, (state, action) => {
        state.fetched = true;
        state.categorias = action.payload;
      })
      .addCase(getAllCategorias.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateCategoria.fulfilled, (state, action) => {
        notify("success", "Categoria actualizada");
        var foundIndex = state.categorias.findIndex(
          (categoria) => categoria.id === action.payload.categoria.id
        );
        state.categorias[foundIndex] = action.payload.categoria;
      })
      .addCase(updateCategoria.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la categoria");
        state.error = true;
      });
    builder
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        notify("success", "Se eliminó la categoria");
        var foundIndex = state.categorias.findIndex(
          (categoria) => categoria.id === action.payload.id
        );
        state.categorias.splice(foundIndex, 1);
      })
      .addCase(deleteCategoria.rejected, (state) => {
        notify("error", "Hubo un error al eliminar la categoria");
        state.error = true;
      });
    builder
      .addCase(deleteManyCategoria.fulfilled, (state, action) => {
        notify("success", "Categorias eliminadas");
        state.categorias = state.categorias.filter(
          (categoria) => !action.payload.ids.find((rm) => rm === categoria.id)
        );
      })
      .addCase(deleteManyCategoria.rejected, (state) => {
        notify("error", "Hubo un error al eliminar las categorias");
        state.error = true;
      });
  },
});

export default categoriasSlice.reducer;
