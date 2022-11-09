import { configureStore } from "@reduxjs/toolkit";

import ModalReducer from "../reducers/ModalReducer";
import AuthReducer from "../reducers/AuthReducer";

import RolesReducer from "../reducers/RolesReducer";
import UsuarioReducer from "../reducers/UsuarioReducer";
import PacienteReducer from "../reducers/PacienteReducer";
import EspecialistaReducer from "../reducers/EspecialistaReducer";

import NotaReducer from "../reducers/NotaReducer";
import PublicidadReducer from "../reducers/PublicidadReducer";

import CursoReducer from "../reducers/CursoReducer";
import ActividadesReducer from "../reducers/ActividadesReducer";

import CarreraReducer from "../reducers/CarreraReducer";
import CategoriaReducer from "../reducers/CategoriaReducer";
import EspecialidadReducer from "../reducers/EspecialidadReducer";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    // Usuarios y relacionados
    roles: RolesReducer,
    usuarios: UsuarioReducer,
    pacientes: PacienteReducer,
    especialistas: EspecialistaReducer,
    // Caracteristicas
    cursos: CursoReducer,
    actividades: ActividadesReducer,
    notas: NotaReducer,
    publicidades: PublicidadReducer,
    // Catalogos
    carreras: CarreraReducer,
    categorias: CategoriaReducer,
    especialidades: EspecialidadReducer,
  },
});
