import { useDispatch } from "react-redux";

import { IconButton, Tooltip } from "@mui/material";
import { ThumbDownRounded, ThumbUpRounded } from "@mui/icons-material";
import { acceptNota, rejectNota } from "../../services/NotaService";

const NotaButtons = ({ item, setSelected }) => {
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
            aceptarNota();
          }}
        >
          <ThumbUpRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rechazar">
        <IconButton
          onClick={() => {
            setSelected([]);
            rechazarNota();
          }}
        >
          <ThumbDownRounded />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default NotaButtons;
