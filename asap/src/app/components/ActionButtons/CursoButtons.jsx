import { AssignmentRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CursoButtons = ({ item, setSelected }) => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Editar contenido">
      <IconButton
        onClick={() => {
          setSelected([]);
          navigate("/actividades", { state: { item: item } });
        }}
      >
        <AssignmentRounded />
      </IconButton>
    </Tooltip>
  );
};

export default CursoButtons;
