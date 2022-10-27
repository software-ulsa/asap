import { useState } from "react";
import { useDispatch } from "react-redux";

import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, IconButton, Stack } from "@mui/material";

import ImagenesService from "../../../services/ImagesService";
import { createUser, updateUser } from "../../../services/UsuarioService";

import { emptyUser } from "../../../utils/initialStates";

const ImagenPerfil = ({
  mode,
  usuario,
  setUsuario,
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

  const guardarUsuario = () => {
    if (file) {
      ImagenesService.upload(file)
        .then((response) => {
          usuario.foto_perfil = response.data;
        })
        .catch((error) => console.log(error));
    }

    if (mode) {
      dispatch(createUser(usuario));
      setUsuario(emptyUser);
    } else {
      dispatch(updateUser(usuario));
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
            onClick={guardarUsuario}
          >
            Guardar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setUsuario(emptyUser);
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
