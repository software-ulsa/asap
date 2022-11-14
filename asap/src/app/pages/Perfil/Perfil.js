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
import { parseDate } from "../../utils/utils";

const Perfil = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (currentUser.imagen) {
      ImagenesService.get(currentUser.imagen)
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
          id: currentUser.id,
          nombre: currentUser.persona.nombre,
          ape_paterno: currentUser.persona.ape_paterno,
          ape_materno: currentUser.persona.ape_materno,
          fecha_nac: parseDate(currentUser.persona.fecha_nac),
          sexo: currentUser.persona.sexo,
          telefono: currentUser.persona.telefono,
          correo: currentUser.persona.correo,
          username: currentUser.username,
          rol_id: currentUser.rol_id,
          activo: currentUser.activo,
          imagen: currentUser.imagen,
          password: "",
        }}
        validationSchema={profileValidationSchema}
        onSubmit={(values) => {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.imagen = response.data;
              })
              .catch((error) => console.log(error));
          }
          dispatch(updateProfile(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container paddingBottom={2} columnGap={2}>
              <Grid currentUser xs={12}>
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
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!props.isValid}
              >
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
