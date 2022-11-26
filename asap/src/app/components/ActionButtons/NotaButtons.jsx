import { useDispatch } from "react-redux";

import { IconButton, Tooltip } from "@mui/material";
import { ThumbDownRounded, ThumbUpRounded } from "@mui/icons-material";
import { acceptNota, rejectNota } from "../../services/NotaService";
import { notify } from "../../utils/utils";

const NotaButtons = ({ item, setSelected, size }) => {
  const dispatch = useDispatch();

  const aceptarNota = () => {
    dispatch(acceptNota(item));
  };

  const rechazarNota = () => {
    dispatch(rejectNota(item));
  };

  return (
    <>
      <Tooltip title="Aceptar">
        <IconButton
          onClick={() => {
            setSelected([]);
            if (size === 1) {
              aceptarNota();
            } else {
              notify("error", "Solo se puede aceptar un elemento a la vez");
            }
          }}
        >
          <ThumbUpRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rechazar">
        <IconButton
          onClick={() => {
            setSelected([]);
            if (size === 1) {
              rechazarNota();
            } else {
              notify("error", "Solo se puede aceptar un elemento a la vez");
            }
          }}
        >
          <ThumbDownRounded />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default NotaButtons;
