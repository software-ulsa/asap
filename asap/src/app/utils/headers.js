import { Pending, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const styles = makeStyles((theme) => ({
  centeredHeader: {
    "& > span": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    "& > span > button": {
      margin: 0,
      fontWeight: "bold",
    },
  },
  centeredHeaderDiv: {
    "& > div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: 0,
      fontWeight: "bold",
    },
  },
}));

const noHeader = {
  name: "",
  label: "No.",
  options: {
    sort: false,
    filter: false,
    customBodyRender: (value, tableMeta, update) => {
      let rowIndex = Number(tableMeta.rowIndex) + 1;
      return <center>{rowIndex}</center>;
    },
    setCellHeaderProps: () => ({
      className: styles().centeredHeaderDiv,
    }),
  },
};

const idHeader = {
  name: "id",
  label: "Id",
  options: {
    display: false,
    filter: false,
  },
};

export const rolHeaders = [
  noHeader,
  idHeader,
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "descripcion",
    label: "Descripcion",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "permisos",
    label: "Permisos",
    options: {
      filter: false,
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((permiso, index) => (
            <Chip color="info" key={index} label={permiso} />
          ))}
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const carreraHeaders = [
  noHeader,
  idHeader,
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "abreviatura",
    label: "Abreviatura",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const categoriaHeaders = [
  noHeader,
  idHeader,
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "descripcion",
    label: "Descripcion",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const especialidadHeaders = [
  noHeader,
  idHeader,
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "tipo",
    label: "Tipo",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const pacienteHeaders = [
  noHeader,
  idHeader,
  {
    name: "usuario.persona.nombre",
    label: "Nombre",
    options: {
      filter: false,

      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "matricula",
    label: "Matricula",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "usuario.persona.telefono",
    label: "Teléfono",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "carrera.abreviatura",
    label: "Carrera",
    options: {
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip sx={{ backgroundColor: "#a3e9df" }} label={data} />
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const especialistaHeaders = [
  noHeader,
  idHeader,
  {
    name: "usuario.persona.nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },

  {
    name: "usuario.persona.telefono",
    label: "Teléfono",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "cedula_prof",
    label: "Cédula profesional",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "especialidad.nombre",
    label: "Especialidad",
    options: {
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip sx={{ backgroundColor: "#e5e9a3" }} label={data} />
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const usuarioHeaders = [
  noHeader,
  idHeader,
  {
    name: "persona.nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "persona.correo",
    label: "Correo",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "persona.telefono",
    label: "Teléfono",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "rol.nombre",
    label: "Rol",
    options: {
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip sx={{ backgroundColor: "#d8a3e9" }} label={data} />
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const cursoHeaders = [
  noHeader,
  idHeader,
  {
    name: "titulo",
    label: "Titulo",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "descripcion",
    label: "Descripcion",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "categoria.nombre",
    label: "Categoria",
    options: {
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip sx={{ backgroundColor: "#a3d6e9" }} label={data} />
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const notaHeaders = [
  noHeader,
  idHeader,
  {
    name: "titulo",
    label: "Titulo",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "tema",
    label: "Tema",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "estado",
    label: "Estado",
    options: {
      customBodyRender: (data) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chip
            icon={
              data === "Pendiente" ? (
                <Pending />
              ) : data === "Aceptado" ? (
                <ThumbUp />
              ) : (
                <ThumbDown />
              )
            }
            color={
              data === "Aceptado"
                ? "success"
                : data === "Rechazado"
                ? "error"
                : "secondary"
            }
            label={data}
          />
        </Box>
      ),
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const publicidadHeaders = [
  noHeader,
  idHeader,
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "empresa",
    label: "Empresa",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "correo_empresa",
    label: "Correo",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const actividadHeaders = [
  noHeader,
  idHeader,
  {
    name: "titulo",
    label: "Titulo",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "descripcion",
    label: "Descripcion",
    options: {
      filter: false,
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];
