import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { grey } from "@mui/material/colors";
import Carousel from "react-material-ui-carousel";
import { PhotoCameraRounded } from "@mui/icons-material";

import * as yup from "yup";
import { Formik } from "formik";

import CursoService from "../../services/CursoService";
import ImagenesService from "../../services/ImagesService";

import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";

import CrearActividad from "./Actividad/CrearActividad";
import ActividadItem from "./Actividad/ActividadItem";

const EditarCurso = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { item } = state;

  const [curso, setCurso] = useState(item);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const guardarCurso = (values) => {
    CursoService.updateCurso(values)
      .then((response) => {
        if (response.message) {
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });

    obtenerImagen(values.icono);
  };

  const obtenerImagen = (key) => {
    ImagenesService.get(key)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!fetched) {
      CursoService.getCursoById(curso.id)
        .then((response) => {
          setCurso(response);
          setFetched(true);
          obtenerImagen(response.icono);
        })
        .catch((error) => {
          notify("error", error);
        });
    }
  }, [fetched]);

  useEffect(() => {
    if (curso.icono !== "no-icon") {
      obtenerImagen(curso.icono);
    } else {
      setImage();
    }
  }, []);

  const validationSchema = yup.object({
    titulo: yup.string().required("Titulo requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

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

  return (
    <>
      <Helmet>
        <title>{`${curso?.titulo}`} - ASAP</title>
        <meta name="Cursos" content="Cursos registrados" />
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" marginBottom={3}>
          Informaci&oacute;n general
        </Typography>
      </Box>
      <Formik
        initialValues={{
          titulo: curso?.titulo || "",
          descripcion: curso?.descripcion || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          values.id = curso?.id;
          values.icono = curso?.icono;
          setLoading(true);

          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.icono = response.data;
                guardarCurso(values);
              })
              .catch((error) => console.log(error));
          } else {
            guardarCurso(values);
          }
          setLoading(false);
          setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              gap={2}
            >
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
                      height: "150px",
                      width: "150px",
                    }}
                    src={image}
                  >
                    <PhotoCameraRounded />
                  </Avatar>
                </IconButton>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Título"
                    name="titulo"
                    variant="outlined"
                    value={props.values.titulo}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.titulo && Boolean(props.errors.titulo)}
                    helperText={props.touched.titulo && props.errors.titulo}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    multiline
                    maxRows={3}
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={props.values.descripcion}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.descripcion &&
                      Boolean(props.errors.descripcion)
                    }
                    helperText={
                      props.touched.descripcion && props.errors.descripcion
                    }
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                py: 2,
              }}
              gap={2}
            >
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="secondary"
              >
                Guardar
              </LoadingButton>
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/cursos")}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Divider></Divider>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          py: 3,
        }}
        gap={2}
      >
        <Typography variant="h4" gutterBottom>
          Contenido del curso
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpenCreate}>
          Agregar actividad
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          py: 3,
        }}
        gap={2}
      >
        <Carousel
          fullHeightHover
          autoPlay={false}
          animation="slide"
          navButtonsAlwaysVisible
          sx={{ width: "100%" }}
        >
          {curso &&
            curso.actividades.map((item, i) => (
              <ActividadItem
                actividad={item}
                setFetched={setFetched}
                notify={notify}
              />
            ))}
        </Carousel>
      </Box>

      <CrearActividad
        handleClose={handleCloseCreate}
        open={openCreate}
        notify={notify}
        curso={curso}
      />

      <ToastContainer />
    </>
  );
};

export default EditarCurso;
