import * as yup from "yup";

import ChipInput from "material-ui-chip-input";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Field, useFormik } from "formik";
import NotaService from "../../services/NotaService";
import { useState } from "react";
import ImagenesService from "../../services/ImagesService";
import {
  Avatar,
  Divider,
} from "@mui/material";
import { blue, green, deepOrange } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";


const CrearNota = ({ open, handleClose, notify }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
    var inputThumbnail = document.getElementById("subirThumbnail");
    inputThumbnail?.click();
  };

  const guardarNota = (values) => {
    NotaService.createNota(values)
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
  };

  const validationSchema = yup.object({
    titulo: yup.string().required("titulo requerido"),
    tema: yup.string().required("tema requerido"),
    contenido: yup.string().required("contenido requerido"),
    palabras_clave: yup.string().required("palabras clave requerido"),
  });

  const formik = useFormik({
    initialValues: { titulo: "", tema: "", foto_thumbnail: "", foto_principal: "", contenido: "", palabras_clave:"", },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (file) {
        ImagenesService.upload(file)
          .then((response) => {
            values.foto_principal = response.data;
            guardarNota(values);
          })
          .catch((error) => console.log(error));
      } else {
        guardarNota(values);
      }
      setFile();
      setImage("");
      resetForm();
      setSubmitting(false);
      handleClose();
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (file) {
        ImagenesService.upload(file)
          .then((response) => {
            values.foto_thumbnail = response.data;
            guardarNota(values);
          })
          .catch((error) => console.log(error));
      } else {
        guardarNota(values);
      }
      setFile();
      setImage("");
      resetForm();
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <TextField
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
      ></TextField>
      <TextField
        type="file"
        accept="image/*"
        id="subirThumbnail"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(URL.createObjectURL(file));
            setFile(file);
          }
        }}
        hidden
      ></TextField>
      <DialogTitle>Agregar nota</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
                <Divider>
                  <IconButton onClick={doClickOnInput}>
                    <Avatar
                      sx={{
                        bgcolor: blue[500],
                        height: "150px",
                        width: "150px",
                      }}
                      variant="rounded"
                      src={image}
                    >
                      <PhotoCameraRounded />
                    </Avatar>
                  </IconButton>
                </Divider>
            </Grid> 
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Titulo"
                name="titulo"
                variant="outlined"
                value={formik.values.titulo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                helperText={formik.touched.titulo && formik.errors.titulo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="tema"
                label="Tema"
                variant="outlined"
                value={formik.values.tema}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.tema &&
                  Boolean(formik.errors.tema)
                }
                helperText={
                  formik.touched.tema && formik.errors.tema
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider>Contenido</Divider>
            </Grid>
            <Grid item xs={12}>
                <Divider>
                  <IconButton onClick={doClickOnInput}>
                    <Avatar
                      sx={{
                        bgcolor: green[500],
                        height: "150px",
                        width: "150px",
                      }}
                      variant="square"
                      src={image}
                    >
                      <PhotoCameraRounded />
                    </Avatar>
                  </IconButton>
                </Divider>
            </Grid> 
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Contenido"
                name="contenido"
                variant="outlined"
                value={formik.values.contenido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contenido && Boolean(formik.errors.contenido)}
                helperText={formik.touched.contenido && formik.errors.contenido}
              />
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                color="info"
                fullWidth
                label="Palabras clave"
                name="palabras_clave"
                variant="outlined" 
                placeholder="Escribe y presiona enter para agregar"
                value={formik.values.palabras_clave}
                error={formik.touched.palabras_clave && Boolean(formik.errors.palabras_clave)}
                helperText={formik.touched.palabras_clave && formik.errors.palabras_clave}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Box paddingBottom={2} paddingRight={2}>
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Agregar
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrearNota;
