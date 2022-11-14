import React from "react";
import { useDispatch } from "react-redux";
import { handleBack } from "../../../reducers/ModalReducer";

import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";
import { IconButton, Avatar, Button, Stack } from "@mui/material";

const IconPublicidad = ({
  image,
  setImage,
  setFile,
  guardarPublicidad,
  cancelAction,
}) => {
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
          <Button
            variant="contained"
            color="secondary"
            onClick={guardarPublicidad}
          >
            Guardar
          </Button>

          <Button variant="contained" color="error" onClick={cancelAction}>
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default IconPublicidad;
