import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as yup from "yup";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";

import { IconButton, Button, Grid, Typography, Avatar } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

import UsuarioService from "../../services/UsuarioService";
import ImagenesService from "../../services/ImagesService";
import RolService from "../../services/RolService";

import { phoneRegExp } from "../../utils/utils";
import { AuthContext } from "../../context/AuthContext";

import Registro from "./Registro";
import InfoBasica from "./InfoBasica";

const Perfil = () => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [roles, setRoles] = useState();
  const [fetched, setFetched] = useState(false);

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const notify = useCallback(
    (action, message) => {
      setFetched(!fetched);
      const configuration = {
        position: "top-right",
        autoClose: 1500,
        theme: "light",
      };
      action === "success"
        ? toast.success(message, configuration)
        : toast.error(message, configuration);
    },
    [fetched]
  );

  useEffect(() => {
    if (currentUser.foto_perfil) {
      ImagenesService.get(currentUser.foto_perfil)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImage();
    }
    RolService.getAllRoles()
      .then((response) => {
        setRoles(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const guardarUsuario = (values) => {
    UsuarioService.updateUser(values)
      .then((response) => {
        if (response.message) {
          updateUser(values);
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    ape_paterno: yup.string().required("Apellido paterno requerido"),
    ape_materno: yup.string().required("Apellido materno requerido"),
    edad: yup
      .number("La edad debe ser un número")
      .positive("La edad debe ser mayor a 0")
      .integer("La edad debe ser un número")
      .max(120, "Edad no válida")
      .required("Edad requerida"),
    sexo: yup
      .string()
      .oneOf(["Masculino", "Femenino"])
      .label("Elegir uno")
      .required("Sexo requerido"),
    matricula: yup
      .string()
      .max(9, "Matricula no válida")
      .required("Matricula requerida"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Teléfono no váildo")
      .required("Teléfono requerido"),
    correo: yup.string().email("Correo no válido").required("Correo requerido"),
  });

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
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.foto_usuario = response.data;
                guardarUsuario(values);
              })
              .catch((error) => console.log(error));
          } else {
            guardarUsuario(values);
          }
          setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container paddingBottom={2}>
              <Grid item xs={12}>
                <InfoBasica formik={props} />
              </Grid>
              <Grid item xs={12}>
                <Registro formik={props} roles={roles} />
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
                  Cancelar
                </Button>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default Perfil;
