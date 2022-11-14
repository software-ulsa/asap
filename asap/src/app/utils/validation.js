import * as yup from "yup";
import { phoneRegExp, numberRegExp } from "./utils";

export const personaValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  ape_paterno: yup.string().required("Apellido paterno requerido"),
  ape_materno: yup.string().required("Apellido materno requerido"),
  sexo: yup
    .string()
    .oneOf(["Masculino", "Femenino"])
    .label("Elegir uno")
    .required("Sexo requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Teléfono no váildo")
    .required("Teléfono requerido"),
  correo: yup.string().email("Correo no válido").required("Correo requerido"),
});

export const usuarioValidationSchema = (isUpdate) => {
  return yup.object({
    username: yup.string().required("Nombre de usuario requerido"),
    password: isUpdate
      ? yup.string()
      : yup.string().required("Contraseña requerida"),
  });
};

export const domicilioValidationSchema = yup.object({
  calle: yup.string().required("Calle requerida"),
  colonia: yup.string().required("Colonia requerida"),
  codigo_postal: yup
    .string()
    .matches(numberRegExp, "Código postal no váildo")
    .required("Código postal requerido"),
});

export const basicInfoValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  ape_paterno: yup.string().required("Apellido paterno requerido"),
  ape_materno: yup.string().required("Apellido materno requerido"),
  edad: yup
    .number("La edad debe ser un número")
    .positive("La edad debe ser mayor a 0")
    .integer("La edad debe ser un número")
    .max(120, "Edad no válida")
    .required("Edad requerida"),
  sexo: yup
    .string()
    .oneOf(["Masculino", "Femenino"])
    .label("Elegir uno")
    .required("Sexo requerido"),
});

export const registerUserValidationSchema = (isCreate) => {
  return yup.object({
    matricula: yup
      .string()
      .max(9, "Matricula no válida")
      .required("Matricula requerida"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Teléfono no váildo")
      .required("Teléfono requerido"),
    correo: yup.string().email("Correo no válido").required("Correo requerido"),
    password: isCreate
      ? yup.string().required("Contraseña requerida")
      : yup.string(),
  });
};

export const publicidadInfoValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  descripcion: yup.string().required("Descripción de publicidad requerida"),
  fecha_inicio: yup
    .date()
    .default(() => new Date())
    .required("Fecha de inicio requerido"),
  fecha_fin: yup
    .date()
    .when(
      "fecha_inicio",
      (fecha_inicio, schema) =>
        fecha_inicio &&
        schema.min(
          fecha_inicio,
          "La fecha de fin debe ser posterior a la de inicio"
        )
    )
    .required("Fecha de fin requerido"),
});

export const publicidadDetailValidationSchema = yup.object({
  empresa: yup.string().required("Nombre de empresa requerida"),
  correo_empresa: yup
    .string()
    .email("Correo no válido")
    .required("Correo requerido"),
  url_empresa: yup.string().url("URL no válido").required("URL requerido"),
});

export const profileValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  ape_paterno: yup.string().required("Apellido paterno requerido"),
  ape_materno: yup.string().required("Apellido materno requerido"),
  sexo: yup
    .string()
    .oneOf(["Masculino", "Femenino"])
    .label("Elegir uno")
    .required("Sexo requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Teléfono no váildo")
    .required("Teléfono requerido"),
});

export const notaValidationSchema = yup.object({
  titulo: yup.string().required("Título requerido"),
  tema: yup.string().required("Tema requerido"),
});

export const cursoBasicInfoValidationSchema = yup.object({
  titulo: yup.string().required("Titulo requerido"),
  descripcion: yup.string().required("Descripción requerida"),
  objetivo: yup.string().required("Objetivo requerido"),
  duracion: yup
    .number("La duracion debe ser un número")
    .positive("La duracion debe ser mayor a 0")
    .integer("La duracion debe ser un número")
    .max(120, "Duracion no válida")
    .required("Duracion requerida"),
});

export const cursoDetailValidationSchema = yup.object({
  fecha_inicio: yup.date().default(() => new Date()),
  fecha_vencimiento: yup
    .date()
    .when(
      "fecha_inicio",
      (fecha_inicio, schema) =>
        fecha_inicio &&
        schema.min(
          fecha_inicio,
          "La fecha de cierre no puede ser antes que la fecha de inicio"
        )
    ),
});

export const especialistaContactValidationSchema = yup.object({
  correo: yup.string().email("Correo no válido").required("Correo requerido"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Teléfono no váildo")
    .required("Teléfono requerido"),
});

export const especialistaBasicInfoValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  ape_paterno: yup.string().required("Apellido paterno requerido"),
  ape_materno: yup.string().required("Apellido materno requerido"),
  edad: yup
    .number("La edad debe ser un número")
    .positive("La edad debe ser mayor a 0")
    .integer("La edad debe ser un número")
    .max(120, "Edad no válida")
    .required("Edad requerida"),
  sexo: yup
    .string()
    .oneOf(["Masculino", "Femenino"])
    .label("Elegir uno")
    .required("Sexo requerido"),
});

export const especialistaProfessionValidationSchema = yup.object({
  cedula: yup
    .string()
    .min(8, "Cédula no válida")
    .max(8, "Cédula no válida")
    .required("Cédula requerida"),
});

export const actividadValidationSchema = yup.object({
  titulo: yup.string().required("Título requerido"),
  descripcion: yup.string().required("Descripción requerida"),
});
