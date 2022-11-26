import { AssignmentRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/utils";

const CursoButtons = ({ item, setSelected, size }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Editar contenido">
      <IconButton
        onClick={() => {
          setSelected([]);
          if (size === 1) {
            navigate("/actividades", { state: { item: item } });
          } else {
            notify("error", "Solo se puede editar un elemento a la vez");
          }
        }}
      >
        <AssignmentRounded />
      </IconButton>
    </Tooltip>
  );
};

export default CursoButtons;
