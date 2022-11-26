import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleBack } from "../../reducers/ModalReducer";

import { grey, red } from "@mui/material/colors";
import { BrokenImageRounded, PhotoCameraRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";

import ImagenesService from "../../services/ImagesService";

const InputImage = ({
  item,
  setItem,
  saveAction,
  cancelAction,
  campo = "imagen",
  height = "300px",
  width = "300px",
  variant = "",
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(item[campo] ? false : true);
  const [error, setError] = useState(false);

  useEffect(() => {}, [loaded]);

  useEffect(() => {
    if (item[campo]) {
      ImagenesService.get(item[campo])
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          setError(true);
          console.log(`${error.message}. No se pudo recuperar la imagen`);
        });
    }
  }, [item]);

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoaded(false);
      ImagenesService.upload(file)
        .then((response) => {
          setImage(URL.createObjectURL(file));
          setItem((prev) => ({
            ...prev,
            [campo]: response.data,
          }));
          setLoaded(true);
        })
        .catch((error) => {
          setLoaded(true);
          setError(true);
          console.log(`Error ${error.message}. No se pudo recuperar la imagen`);
        });
    }
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
              onChange={(e) => uploadImage(e)}
              hidden
            ></input>
            {error ? (
              <Box
                sx={{
                  height: { height },
                  width: { width },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: red[500],
                    height: { height },
                    width: { width },
                  }}
                  imgProps={{
                    onLoad: () => setLoaded(true),
                  }}
                  src={image}
                  variant={variant}
                >
                  <BrokenImageRounded sx={{ fontSize: "4em" }} />
                </Avatar>
              </Box>
            ) : (
              <>
                <Box
                  sx={
                    loaded
                      ? { display: "none" }
                      : {
                          height: { height },
                          width: { width },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                  }
                >
                  <CircularProgress color="secondary" />
                </Box>
                <IconButton
                  sx={
                    loaded ? { display: "inline-block" } : { display: "none" }
                  }
                  onClick={doClickOnInput}
                >
                  <Avatar
                    sx={{
                      bgcolor: grey[900],
                      height: { height },
                      width: { width },
                    }}
                    imgProps={{
                      onLoad: () => setLoaded(true),
                    }}
                    src={image}
                    variant={variant}
                  >
                    <PhotoCameraRounded />
                  </Avatar>
                </IconButton>
              </>
            )}
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
          onClick={() => dispatch(handleBack())}
          sx={{ mr: 1 }}
        >
          Anterior
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!loaded}
            onClick={saveAction}
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

export default InputImage;
