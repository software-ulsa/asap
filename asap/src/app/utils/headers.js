import { makeStyles } from "@mui/styles";

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
}));

const noHeader = {
  name: "",
  label: "No.",
  options: {
    filter: false,
    customBodyRender: (value, tableMeta, update) => {
      let rowIndex = Number(tableMeta.rowIndex) + 1;
      return <center>{rowIndex}</center>;
    },
    setCellHeaderProps: () => ({
      className: styles().centeredHeader,
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
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
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
    name: "usuario",
    label: "Nombre",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["persona"]["nombre"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "carrera",
    label: "Carrera",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["abreviatura"]}</center>;
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
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "usuario",
    label: "Teléfono",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["persona"]["telefono"]}</center>;
      },
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
    name: "usuario",
    label: "Nombre",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["persona"]["nombre"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "especialidad",
    label: "Especialidad",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["nombre"]}</center>;
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
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "usuario",
    label: "Teléfono",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["persona"]["telefono"]}</center>;
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
    name: "persona",
    label: "Nombre",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["nombre"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "persona",
    label: "Correo",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["correo"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "persona",
    label: "Teléfono",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["telefono"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
  {
    name: "rol",
    label: "Rol",
    options: {
      customBodyRender: (data, type, row) => {
        return <center>{data["nombre"]}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];

export const cursoHeaders = (categorias) => {
  return [
    noHeader,
    idHeader,
    {
      name: "titulo",
      label: "Titulo",
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
      name: "descripcion",
      label: "Descripcion",
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
      name: "categoria",
      label: "Categoria",
      options: {
        filterType: "checkbox",
        filterOptions: {
          names: [...new Set(categorias.map((item) => item.nombre))],
          logic(categoria, filterVal) {
            const show = filterVal.indexOf(categoria["nombre"]) >= 0;
            return !show;
          },
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return <center>{value["nombre"]}</center>;
        },
        setCellHeaderProps: () => ({
          className: styles().centeredHeader,
        }),
      },
    },
  ];
};

export const notaHeaders = [
  noHeader,
  idHeader,
  {
    name: "titulo",
    label: "Titulo",
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
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
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
      customBodyRender: (data, type, row) => {
        return <center>{data}</center>;
      },
      setCellHeaderProps: () => ({
        className: styles().centeredHeader,
      }),
    },
  },
];
