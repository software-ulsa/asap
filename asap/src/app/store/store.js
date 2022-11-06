import { configureStore } from "@reduxjs/toolkit";

import ModalReducer from "../reducers/ModalReducer";
import AuthReducer from "../reducers/AuthReducer";

import RolesReducer from "../reducers/RolesReducer";
import UsuarioReducer from "../reducers/UsuarioReducer";
import EspecialistaReducer from "../reducers/EspecialistaReducer";

import NotaReducer from "../reducers/NotaReducer";
import PublicidadReducer from "../reducers/PublicidadReducer";

import CursoReducer from "../reducers/CursoReducer";
import ActividadesReducer from "../reducers/ActividadesReducer";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    roles: RolesReducer,
    usuarios: UsuarioReducer,
    especialistas: EspecialistaReducer,
    cursos: CursoReducer,
    actividades: ActividadesReducer,
    notas: NotaReducer,
    publicidades: PublicidadReducer,
  },
});
