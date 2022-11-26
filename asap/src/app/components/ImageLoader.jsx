import { useEffect, useState } from "react";

import { grey, red } from "@mui/material/colors";
import { BrokenImageRounded, PhotoCameraRounded } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Grid, IconButton } from "@mui/material";

import ImagenesService from "../services/ImagesService";

const ImageLoader = ({
  formik,
  campo,
  height = "300px",
  width = "300px",
  variant = "",
}) => {
  const [image, setImage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, [loaded]);

  useEffect(() => {
    const media = formik.values[campo];
    if (media !== "" && !media.includes("http")) {
      ImagenesService.get(formik.values[campo])
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          setError(true);
          console.log(`${error.message}. No se pudo recuperar la imagen`);
        });
    } else {
      setLoaded(true);
    }
  }, [formik]);

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
          formik.setFieldValue(campo, response.data);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: { height }, width: { width } }}
      >
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
              sx={loaded ? { display: "inline-block" } : { display: "none" }}
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
    </>
  );
};

export default ImageLoader;
