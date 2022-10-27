import * as yup from "yup";
import { phoneRegExp } from "./utils";

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

export const publicidadValidationSchema = yup.object({
  nombre: yup.string().required("Nombre requerido"),
  descripcion: yup.string().required("Descripción de empresa requerida"),
  dot_empresa: yup.string().required("Dot de empresa requerida"),
  email: yup.string().email("Correo no válido").required("Correo requerido"),
  url: yup.string().required("URL requerido"),
  fecha_inicio: yup.string().required("Fecha de inicio requerido"),
  fecha_vencimiento: yup.string().required("Fecha de vencimiento requerido"),
});

export const profileValidationSchema = yup.object({
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
  matricula: yup
    .string()
    .max(9, "Matricula no válida")
    .required("Matricula requerida"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Teléfono no váildo")
    .required("Teléfono requerido"),
  correo: yup.string().email("Correo no válido").required("Correo requerido"),
});

export const notaValidationSchema = yup.object({
  titulo: yup.string().required("Título requerido"),
  tema: yup.string().required("Tema requerido"),
});

export const cursoValidationSchema = yup.object({
  titulo: yup.string().required("Titulo requerido"),
  descripcion: yup.string().required("Descripción requerida"),
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
  especialidad: yup.string().required("Especialidad requerida"),
  cedula: yup
    .string()
    .min(8, "Cédula no válida")
    .max(8, "Cédula no válida")
    .required("Cédula requerida"),
  area_especialidad: yup.string().required("Área de especialidad requerida"),
});

export const actividadValidationSchema = yup.object({
  titulo: yup.string().required("Título requerido"),
  descripcion: yup.string().required("Descripción requerida"),
});
