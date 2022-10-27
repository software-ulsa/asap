import { useState } from "react";
import { useDispatch } from "react-redux";

import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, IconButton, Stack } from "@mui/material";

import ImagenesService from "../../../services/ImagesService";

import { emptyEspecialista } from "../../../utils/initialStates";
import {
  createEspecialista,
  updateEspecialista,
} from "../../../services/EspecialistaService";

const ImagenPerfil = ({
  mode,
  especialista,
  setEspecialista,
  setActiveStep,
  handleBack,
  handleClose,
}) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const guardarEspecialista = () => {
    if (file) {
      ImagenesService.upload(file)
        .then((response) => {
          especialista.foto_perfil = response.data;
        })
        .catch((error) => console.log(error));
    }

    if (mode) {
      dispatch(createEspecialista(especialista));
      setEspecialista(emptyEspecialista);
    } else {
      dispatch(updateEspecialista(especialista));
    }
    setFile();
    setImage("");
    setActiveStep(0);
    handleClose();
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} px={10}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
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
        </Grid>
      </Grid>
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
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Anterior
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={guardarEspecialista}
          >
            Guardar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setEspecialista(emptyEspecialista);
              setActiveStep(0);
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ImagenPerfil;
