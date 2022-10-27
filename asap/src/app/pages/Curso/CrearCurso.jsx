import { useState } from "react";
import { useDispatch } from "react-redux";

import { IconButton, Dialog, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import IconCurso from "./IconCurso";
import InfoCurso from "./InfoCurso";
import { emptyCurso } from "../../utils/initialStates";

const CrearCurso = ({ open, handleClose }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear curso</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={2}
      >
        <IconCurso image={image} setImage={setImage} setFile={setFile} />
        <InfoCurso
          file={file}
          curso={emptyCurso}
          cancelAction={handleClose}
          mode={true}
        />
      </Box>
    </Dialog>
  );
};

export default CrearCurso;
