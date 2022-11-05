import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../reducers/AuthReducer";
import RolesReducer from "../reducers/RolesReducer";
import UsuarioReducer from "../reducers/UsuarioReducer";
import NotaReducer from "../reducers/NotaReducer";
import PublicidadReducer from "../reducers/PublicidadReducer";
import EspecialistaReducer from "../reducers/EspecialistaReducer";
import CursoReducer from "../reducers/CursoReducer";
import ActividadesReducer from "../reducers/ActividadesReducer";
import ModalReducer from "../reducers/ModalReducer";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    roles: RolesReducer,
    usuarios: UsuarioReducer,
    notas: NotaReducer,
    publicidades: PublicidadReducer,
    especialistas: EspecialistaReducer,
    cursos: CursoReducer,
    actividades: ActividadesReducer,
  },
});
