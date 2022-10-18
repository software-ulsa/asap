import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { Box } from "@mui/system";

import ActividadService from "../../../services/ActividadService";
import ImagenesService from "../../../services/ImagesService";
import { Close } from "@mui/icons-material";

const EditarActividad = ({
  open,
  handleClose,
  notify,
  actividad,
  setFetched,
}) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const guardarActividad = (values) => {
    ActividadService.updateActividad(values)
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
    titulo: yup.string().required("Título requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    initialValues: {
      titulo: actividad?.titulo,
      descripcion: actividad?.descripcion,
      url_media: "a",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      values.id = actividad.id;
      values.id_curso = actividad.id_curso;
      values.peso = 100;
      if (file) {
        ImagenesService.upload(file)
          .then((response) => {
            values.foto_especialista = response.data;
            guardarActividad(values);
          })
          .catch((error) => console.log(error));
      } else {
        guardarActividad(values);
      }
      setFile();
      setImage("");
      resetForm();
      setFetched(false);
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Editar actividad</DialogTitle>
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
        <DialogContent>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Título"
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
                name="descripcion"
                label="Descripcion"
                variant="outlined"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.descripcion &&
                  Boolean(formik.errors.descripcion)
                }
                helperText={
                  formik.touched.descripcion && formik.errors.descripcion
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              pb: 2,
              px: 2,
            }}
            gap={2}
          >
            <Button variant="contained" color="secondary" type="submit">
              Guardar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            >
              Cancelar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditarActividad;
