import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleOpenCreate } from "../reducers/ModalReducer";

import { Box } from "@mui/system";
import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";

import CursoButtons from "./ActionButtons/CursoButtons";

import MUIDataTable from "mui-datatables";
import NotaButtons from "./ActionButtons/NotaButtons";

const SuperDataTable = ({
  data,
  title,
  fetched,
  headers,
  refreshAction,
  deleteAction,
  editAction,
  tableButtons = "DEFAULT",
}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const renderButtons = (selectedRows) => {
    const item = selectedRows.data.map((d) => data[d.dataIndex])[0];

    switch (tableButtons) {
      case "CURSO":
        return <CursoButtons setSelected={setSelected} item={item} />;

      case "NOTA":
        return <NotaButtons setSelected={setSelected} item={item} />;

      default:
        return <></>;
    }
  };

  const options = {
    viewColumns: false,
    filterType: "checkbox",
    rowsSelected: selected,
    enableNestedDataAccess: ".",
    rowsPerPageOptions: [10, 15, 20],
    customToolbar: () => {
      return (
        <>
          <Tooltip title="Refrescar tabla">
            <IconButton onClick={refreshAction}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Crear">
            <IconButton onClick={() => dispatch(handleOpenCreate())}>
              <Add />
            </IconButton>
          </Tooltip>
        </>
      );
    },
    customToolbarSelect: (selectedRows) => {
      return (
        <Box paddingRight="2em">
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => {
                deleteAction(selectedRows);
                setSelected([]);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                editAction(selectedRows);
                setSelected([]);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          {renderButtons(selectedRows)}
        </Box>
      );
    },
    textLabels: {
      body: {
        noMatch: "No hay datos para mostrar",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente",
        previous: "Atrás",
        rowsPerPage: "Filas por hoja:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Exportar a CSV",
        print: "Imprimir",
        viewColumns: "Columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "TODO",
        title: "FILTROS",
        reset: "LIMPIAR",
      },
      selectedRows: {
        text: "fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar registros seleccionados",
      },
    },
  };

  return (
    <>
      {!fetched ? (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <MUIDataTable
          title={
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          }
          data={data}
          columns={headers}
          options={options}
        />
      )}
    </>
  );
};

export default SuperDataTable;
