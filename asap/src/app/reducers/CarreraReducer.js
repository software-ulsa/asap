import { createSlice } from "@reduxjs/toolkit";
import {
  createCarrera,
  deleteManyCarrera,
  deleteCarrera,
  getAllCarreras,
  updateCarrera,
} from "../services/CarreraService";
import { notify } from "../utils/utils";

const initialState = {
  carreras: [],
  fetched: false,
  error: false,
};

export const carrerasSlice = createSlice({
  name: "carreras",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCarrera.fulfilled, (state, action) => {
        notify("success", "Se agregó la carrera");
        state.carreras.push(action.payload.carrera);
      })
      .addCase(createCarrera.rejected, (state) => {
        notify("error", "Hubo un error al agregar la carrera");
        state.error = true;
      });
    builder
      .addCase(getAllCarreras.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllCarreras.fulfilled, (state, action) => {
        state.fetched = true;
        state.carreras = action.payload;
      })
      .addCase(getAllCarreras.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateCarrera.fulfilled, (state, action) => {
        notify("success", "Carrera actualizada");
        var foundIndex = state.carreras.findIndex(
          (carrera) => carrera.id === action.payload.carrera.id
        );
        state.carreras[foundIndex] = action.payload.carrera;
      })
      .addCase(updateCarrera.rejected, (state) => {
        notify("error", "Hubo un error al actualizar la carrera");
        state.error = true;
      });
    builder
      .addCase(deleteCarrera.fulfilled, (state, action) => {
        notify("success", "Se eliminó la carrera");
        var foundIndex = state.carreras.findIndex(
          (carrera) => carrera.id === action.payload.id
        );
        state.carreras.splice(foundIndex, 1);
      })
      .addCase(deleteCarrera.rejected, (state) => {
        notify("error", "Hubo un error al eliminar la carrera");
        state.error = true;
      });
    builder
      .addCase(deleteManyCarrera.fulfilled, (state, action) => {
        notify("success", "Carreras eliminadas");
        state.carreras = state.carreras.filter(
          (carrera) => !action.payload.ids.find((rm) => rm === carrera.id)
        );
      })
      .addCase(deleteManyCarrera.rejected, (state) => {
        notify("error", "Hubo un error al eliminar las carreras");
        state.error = true;
      });
  },
});

export default carrerasSlice.reducer;
