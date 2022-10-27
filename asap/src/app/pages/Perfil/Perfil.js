import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import { Helmet } from "react-helmet";
import {
  IconButton,
  Button,
  Grid,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

import { profileValidationSchema } from "../../utils/validation";

import { updateUser } from "../../services/UsuarioService";
import ImagenesService from "../../services/ImagesService";

import Registro from "./Registro";
import InfoBasica from "./InfoBasica";

const Perfil = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  useEffect(() => {
    if (currentUser.foto_usuario) {
      ImagenesService.get(currentUser.foto_usuario)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Perfil - ASAP</title>
        <meta name="Perfil" content="Mi Perfil" />
      </Helmet>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pb: 2,
          px: 2,
          gap: 2,
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          Mi perfil
        </Typography>
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
              height: "150px",
              width: "150px",
            }}
            src={image}
          >
            <PhotoCameraRounded />
          </Avatar>
        </IconButton>
      </Box>

      <Formik
        initialValues={{
          id: currentUser?.id || -1,
          nombre: currentUser?.nombre || "",
          segundo_nombre: currentUser?.segundo_nombre || "",
          ape_paterno: currentUser?.ape_paterno || "",
          ape_materno: currentUser?.ape_materno || "",
          correo: currentUser?.correo || "",
          password: "",
          telefono: currentUser?.telefono || "",
          edad: currentUser?.edad || 0,
          matricula: currentUser?.matricula || "",
          sexo: currentUser?.sexo || "Elegir uno",
          id_rol: currentUser?.id_rol || 0,
        }}
        validationSchema={profileValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.foto_perfil = response.data;
              })
              .catch((error) => console.log(error));
          }
          dispatch(updateUser(values));
          setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container paddingBottom={2} columnGap={2}>
              <Grid item xs={12}>
                <Divider>Informaci&oacute;n b&aacute;sica</Divider>
              </Grid>
              <Grid item xs={12}>
                <InfoBasica formik={props} />
              </Grid>
              <Grid item xs={12}>
                <Divider>Datos de acceso</Divider>
              </Grid>
              <Grid item xs={12}>
                <Registro formik={props} rol={currentUser?.rol.nombre} />
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
                pb: 2,
                px: 2,
              }}
            ></Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pb: 2,
                px: 2,
              }}
            >
              <Button variant="contained" color="secondary" type="submit">
                Guardar
              </Button>
              <Link to="/">
                <Button variant="contained" color="error">
                  Regresar
                </Button>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Perfil;
