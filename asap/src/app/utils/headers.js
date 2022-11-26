import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Chip, FormControl, Grid, TextField, Typography } from "@mui/material";
import { Pending, ThumbDown, ThumbUp } from "@mui/icons-material";

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
    name: "created_at",
    label: "Fecha de registro",
    options: {
      customBodyRender: (data, type, row) => {
        const date = new Date(data).toLocaleDateString("en-GB");
        return <center>{date}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
      filterType: "custom",
      filterOptions: {
        logic: (data, filters) => {
          const date = new Date(new Date(data).toLocaleDateString());
          const f0 = new Date(filters[0] || "");
          const f1 = new Date(filters[1] || "");
          if (f0 && f1) {
            return date <= f0 || date >= f1;
          } else if (f0) {
            return date <= f0;
          } else if (f1) {
            return date >= f1;
          }
          return false;
        },
        display: (filterList, onChange, index, column) => {
          return (
            <FormControl>
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="#34314c8a">
                    Fecha de registro
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="De"
                    type="date"
                    value={filterList[index][0] || ""}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Hasta"
                    type="date"
                    value={filterList[index][1] || ""}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                  />
                </Grid>
              </Grid>
            </FormControl>
          );
        },
      },
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
