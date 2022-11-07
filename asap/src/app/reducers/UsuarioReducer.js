import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteManyUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../services/UsuarioService";
import { notify } from "../utils/utils";

const initialState = {
  usuarios: [],
  fetched: false,
  error: false,
};

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        notify("success", "Se agregó el usuario");
        state.usuarios.push(action.payload.userSaved);
      })
      .addCase(createUser.rejected, (state) => {
        notify("error", "Hubo un error al agregar el usuario");
        state.error = true;
      });
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.fetched = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.fetched = true;
        state.usuarios = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.error = true;
        state.fetched = true;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        notify("success", "Se actualizó el usuario");
        const foundIndex = state.usuarios.findIndex(
          (usuario) => usuario.id === action.payload.user.id
        );
        state.usuarios[foundIndex] = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el usuario");
        state.error = true;
      });
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        const foundIndex = state.usuarios.findIndex(
          (usuario) => usuario.id === Number(action.payload.id)
        );
        notify("success", "Se eliminó el usuario");
        state.usuarios.splice(foundIndex, 1);
      })
      .addCase(deleteUser.rejected, (state) => {
        notify("error", "Hubo un error al eliminar el usuario");
        state.error = true;
      });
    builder
      .addCase(deleteManyUser.fulfilled, (state, action) => {
        notify("success", "Usuarios eliminados");
        state.usuarios = state.usuarios.filter(
          (usuario) => !action.payload.ids.find((rm) => rm === usuario.id)
        );
      })
      .addCase(deleteManyUser.rejected, (state) => {
        notify("error", "Hubo un error al eliminar los usuarios");
        state.error = true;
      });
  },
});

export default usuariosSlice.reducer;
