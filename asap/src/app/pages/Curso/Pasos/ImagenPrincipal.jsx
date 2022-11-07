import React from "react";
import { useDispatch } from "react-redux";
import {
  handleBack,
  handleClose,
  rebootActiveStep,
} from "../../../reducers/ModalReducer";

import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";
import { IconButton, Avatar, Button, Stack } from "@mui/material";

const IconCurso = ({ image, setImage, setFile, guardarCurso }) => {
  const dispatch = useDispatch();

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <input
          type="file"
          accept="image/*"
          id="subirImagen"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(URL.createObjectURL(file));
              setFile(file);
            }
          }}
          hidden
        ></input>
        <IconButton onClick={doClickOnInput}>
          <Avatar
            sx={{
              bgcolor: grey[900],
              height: "300px",
              width: "300px",
            }}
            src={image}
          >
            <PhotoCameraRounded />
          </Avatar>
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          py: 2,
          px: 2,
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={() => dispatch(handleBack())}
          sx={{ mr: 1 }}
        >
          Anterior
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary" onClick={guardarCurso}>
            Guardar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              dispatch(rebootActiveStep());
              dispatch(handleClose());
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default IconCurso;
