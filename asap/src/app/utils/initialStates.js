export const emptyUser = {
  id: -1,
  nombre: "",
  segundo_nombre: "",
  ape_paterno: "",
  ape_materno: "",
  edad: 0,
  sexo: "Elegir uno",
  foto_usuario: "",
  matricula: "",
  password: "",
  telefono: "",
  id_rol: 0,
  correo: "",
  activo: true,
};

export const emptyNote = {
  id: -1,
  titulo: "",
  tema: "",
  contenido: "",
  palabras_clave: [],
  foto_principal: "",
  foto_thumbnail: "",
};

export const emptyPublicidad = {
  id: -1,
  nombre: "",
  descripcion: "",
  dot_empresa: "",
  email: "",
  url: "",
  fecha_inicio: "",
  fecha_vencimiento: "",
};

export const emptyCurso = { titulo: "", descripcion: "" };

export const emptyActividad = { titulo: "", descripcion: "", url_media: "a" };

export const especialistaInitialState = (especialista) => {
  const item = {
    id: especialista?.id || -1,
    nombre: especialista?.usuario.persona.nombre || "",
    ape_paterno: especialista?.usuario.persona.ape_paterno || "",
    ape_materno: especialista?.usuario.persona.ape_materno || "",
    fecha_nac: especialista?.usuario.persona.fecha_nac || "",
    sexo: especialista?.usuario.persona.sexo || "Elegir uno",
    correo: especialista?.usuario.persona.correo || "",
    telefono: especialista?.usuario.persona.telefono || "",
    calle: especialista?.domicilio.calle || "",
    colonia: especialista?.domicilio.colonia || "",
    estado: especialista?.domicilio.estado || "Elegir uno",
    codigo_postal: especialista?.domicilio.codigo_postal || "",
    username: especialista?.usuario.username || "",
    password: especialista?.usuario.password || "",
    imagen: especialista?.usuario.imagen || "",
    cedula_prof: especialista?.cedula_prof || "",
    especialidad_id: especialista?.especialidad_id || "Elegir uno",
  };
  return item;
};
