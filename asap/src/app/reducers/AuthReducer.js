import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserById,
  login,
  updateProfile,
} from "../services/UsuarioService";
import { notify } from "../utils/utils";

import SecureLS from "secure-ls";

const ls = new SecureLS({ encodingType: "aes" });
const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      ls.removeAll();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { userFound, token } = action.payload;

        state.loading = false;
        state.currentUser = userFound;

        ls.set("_token", JSON.stringify(token));
        ls.set("_user", JSON.stringify(userFound));
        notify(
          "success",
          `Bienvenido ${userFound.persona.nombre} ${userFound.persona.ape_paterno}`
        );
      })
      .addCase(login.rejected, (state) => {
        notify("error", "Verifique sus credenciales");
        state.error = true;
        state.loading = false;
      });
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;

        ls.set("_user", JSON.stringify(action.payload.user));

        notify("success", "Perfil actualizado");
      })
      .addCase(updateProfile.rejected, (state) => {
        notify("error", "Hubo un error al actualizar el perfil");
        state.error = true;
        state.loading = false;
      });

    builder
      .addCase(getCurrentUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;

        ls.set("_user", JSON.stringify(action.payload));

        notify(
          "success",
          `Bienvenido de vuelta, ${action.payload.persona.nombre}`
        );
      })
      .addCase(getCurrentUserById.rejected, (state) => {
        notify("error", "Hubo un error al recuperar la sesión");
        state.error = true;
        state.loading = false;
        state.currentUser = null;
        state.token = null;
        ls.removeAll();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
