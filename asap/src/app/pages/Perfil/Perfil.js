import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

import { profileValidationSchema } from "../../utils/validation";

import { updateProfile } from "../../services/UsuarioService";
import ImagenesService from "../../services/ImagesService";

import InfoBasica from "./InfoBasica";
import Header from "./Header";

const Perfil = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (currentUser.foto_perfil) {
      ImagenesService.get(currentUser.foto_perfil)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentUser]);

  return (
    <>
      <Helmet>
        <title>Perfil - ASAP</title>
        <meta name="Perfil" content="Mi Perfil" />
      </Helmet>
      <Header
        user={currentUser}
        image={image}
        setImage={setImage}
        setFile={setFile}
      />

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
          dispatch(updateProfile(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container paddingBottom={2} columnGap={2}>
              <Grid item xs={12}>
                <InfoBasica formik={props} />
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
                gap: 3,
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
