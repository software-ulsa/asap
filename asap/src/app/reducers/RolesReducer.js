import { createSlice } from "@reduxjs/toolkit";
import {
  createRol,
  deleteManyRol,
  deleteRol,
  getAllRoles,
  updateRol,
} from "../services/RolService";
import { notify } from "../utils/utils";

const initialState = {
  roles: [],
  fetched: false,
  error: false,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRol.fulfilled, (state, action) => {
        notify("success", "Se agregó el rol");
        state.roles.push(action.payload.rol);
      })
      .addCase(createRol.rejected, (state) => {
        notify("error", "Hubo un error al agregar el rol");
        state.error = true;
      });
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.fetched = true;
        state.roles = action.payload;
      })
      .addCase(getAllRoles.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateRol.fulfilled, (state, action) => {
        notify("success", "Rol actualizado");
        const foundIndex = state.roles.findIndex(
          (rol) => rol.id === action.payload.rol.id
        );
        state.roles[foundIndex] = action.payload.rol;
      })
      .addCase(updateRol.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el rol");
        state.error = true;
      });
    builder
      .addCase(deleteRol.fulfilled, (state, action) => {
        notify("success", "Se eliminó el rol");
        const foundIndex = state.roles.findIndex(
          (rol) => rol.id === Number(action.payload.id)
        );
        state.roles.splice(foundIndex, 1);
      })
      .addCase(deleteRol.rejected, (state) => {
        notify("error", "Hubo un error al eliminar el rol");
        state.error = true;
      });
    builder
      .addCase(deleteManyRol.fulfilled, (state, action) => {
        notify("success", "Roles eliminados");
        state.roles = state.roles.filter(
          (rol) => !action.payload.ids.find((rm) => rm === rol.id)
        );
      })
      .addCase(deleteManyRol.rejected, (state) => {
        notify("error", "Hubo un error al eliminar los roles");
        state.error = true;
      });
  },
});

export default rolesSlice.reducer;
