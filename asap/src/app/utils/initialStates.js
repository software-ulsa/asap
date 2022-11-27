import { parseDate } from "./utils";

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

export const pacienteInitialState = (paciente) => {
  const item = {
    id: paciente?.id || -1,
    nombre: paciente?.usuario.persona.nombre || "",
    ape_paterno: paciente?.usuario.persona.ape_paterno || "",
    ape_materno: paciente?.usuario.persona.ape_materno || "",
    fecha_nac: paciente?.usuario.persona.fecha_nac || "",
    sexo: paciente?.usuario.persona.sexo || "Elegir uno",
    correo: paciente?.usuario.persona.correo || "",
    telefono: paciente?.usuario.persona.telefono || "",
    username: paciente?.usuario.username || "",
    password: paciente?.usuario.password || "",
    imagen: paciente?.usuario.imagen || "",
    matricula: paciente?.matricula || "",
    carrera_id: paciente?.carrera_id || "Elegir uno",
  };
  return item;
};

export const usuarioInitialState = (usuario) => {
  const item = {
    id: usuario?.id || -1,
    nombre: usuario?.persona.nombre || "",
    ape_paterno: usuario?.persona.ape_paterno || "",
    ape_materno: usuario?.persona.ape_materno || "",
    fecha_nac: usuario?.persona.fecha_nac || "",
    sexo: usuario?.persona.sexo || "Elegir uno",
    correo: usuario?.persona.correo || "",
    telefono: usuario?.persona.telefono || "",
    username: usuario?.username || "",
    password: usuario?.password || "",
    imagen: usuario?.imagen || "",
    rol_id: usuario?.rol_id || "",
    activo: usuario?.activo || "",
  };
  return item;
};

export const cursoInitialState = (curso) => {
  const item = {
    id: curso?.id || -1,
    titulo: curso?.titulo || "",
    descripcion: curso?.descripcion || "",
    objetivo: curso?.objetivo || "",
    duracion: curso?.duracion || 0,
    fecha_inicio: parseDate(curso?.fecha_inicio),
    fecha_fin: parseDate(curso?.fecha_fin),
    activo: curso?.activo || false,
    imagen: curso?.imagen || "",
    palabras_clave: curso?.palabras_clave || [],
    categoria_id: curso?.categoria_id || "Elegir uno",
  };
  return item;
};

export const notaInitialState = (nota) => {
  const item = {
    id: nota?.id || -1,
    titulo: nota?.titulo || "",
    contenido: nota?.contenido || "",
    imagen: nota?.imagen || "",
    estado: nota?.estado || "",
    tema: nota?.tema || "",
    palabras_clave: nota?.palabras_clave || [],
    usuario_id: nota?.usuario_id || -1,
  };
  return item;
};

export const publicidadInitialState = (publicidad) => {
  const item = {
    id: publicidad?.id || -1,
    nombre: publicidad?.nombre || "",
    descripcion: publicidad?.descripcion || "",
    empresa: publicidad?.empresa || "",
    correo_empresa: publicidad?.correo_empresa || "",
    url_empresa: publicidad?.url_empresa || "",
    imagen: publicidad?.imagen || "",
    fecha_inicio: parseDate(publicidad?.fecha_inicio),
    fecha_fin: parseDate(publicidad?.fecha_fin),
    activo: publicidad?.activo || false,
  };
  return item;
};

export const actividadInitialState = (actividad, cursoId) => {
  const item = {
    id: actividad?.id || -1,
    titulo: actividad?.titulo || "",
    descripcion: actividad?.descripcion || "",
    url_media: actividad?.url_media
      ? !actividad?.url_media.includes("http")
        ? actividad.url_media
        : ""
      : "",
    youtube_url: actividad?.url_media.includes("youtube")
      ? actividad?.url_media
      : "",
    doc_url:
      actividad?.url_media.includes("http") &&
      !actividad?.url_media.includes("youtube")
        ? actividad?.url_media
        : "",
    curso_id: actividad?.curso_id || cursoId,
  };
  return item;
};
