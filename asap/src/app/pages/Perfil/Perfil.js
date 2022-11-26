import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import { Helmet } from "react-helmet";

import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

import { profileValidationSchema } from "../../utils/validation";
import { parseDate } from "../../utils/utils";

import { updateProfile } from "../../services/UsuarioService";

import InfoBasica from "./InfoBasica";
import Header from "./Header";

const Perfil = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {}, [currentUser]);

  return (
    <>
      <Helmet>
        <title>Perfil - ASAP</title>
        <meta name="Perfil" content="Mi Perfil" />
      </Helmet>
      <Formik
        enableReinitialize
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
        onSubmit={(values, { resetForm }) => {
          dispatch(updateProfile(values));
          resetForm();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Header user={currentUser} formik={props} />
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
