import { createSlice } from "@reduxjs/toolkit";
import SecureLS from "secure-ls";
import { login } from "../services/UsuarioService";

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
      const auth = ls.get("currentUser");
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

        ls.set("token", JSON.stringify(token));
        ls.set("currentUser", JSON.stringify(userFound));
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export const { logout, checkUser } = authSlice.actions;
export default authSlice.reducer;
