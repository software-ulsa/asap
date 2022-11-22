import { createSlice } from "@reduxjs/toolkit";
import { useNavigation } from "react-router-dom";
import SecureLS from "secure-ls";
import { login, updateProfile } from "../services/UsuarioService";
import { notify } from "../utils/utils";

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
    checkUser: (state) => {
      let user = null;
      const auth = ls.get("_user");
      if (auth !== "") {
        user = JSON.parse(auth);
        if (!state.currentUser) state.currentUser = user;
        else if (user.id !== state.currentUser.id) state.currentUser = user;
      }
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
      });
  },
});

export const { logout, checkUser } = authSlice.actions;
export default authSlice.reducer;
