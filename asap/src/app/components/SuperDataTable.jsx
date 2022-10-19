import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/system";
import { CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const SuperDataTable = ({
  data,
  headers,
  deleteAction,
  editAction,
  fetched,
}) => {
  const [selected, setSelected] = useState([]);
  const options = {
    viewColumns: false,
    filterType: "checkbox",
    rowsSelected: selected,
    rowsPerPageOptions: [10, 15, 20],
    customToolbarSelect: (selectedRows) => {
      return (
        <Box paddingRight="2em">
          <IconButton
            onClick={() => {
              deleteAction(selectedRows);
              setSelected([]);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => {
              editAction(selectedRows);
              setSelected([]);
            }}
          >
            <Edit />
          </IconButton>
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
          title={"Registros"}
          data={data}
          columns={headers}
          options={options}
        />
      )}
    </>
  );
};

export default SuperDataTable;
