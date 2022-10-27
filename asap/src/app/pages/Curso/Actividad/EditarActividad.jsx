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

import ActividadService, {
  updateActividad,
} from "../../../services/ActividadService";
import ImagenesService from "../../../services/ImagesService";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { actividadValidationSchema } from "../../../utils/validation";

const EditarActividad = ({ open, actividad, handleClose }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      id: actividad?.id,
      titulo: actividad?.titulo,
      descripcion: actividad?.descripcion,
      url_media: actividad?.url_media,
      id_curso: actividad?.id_curso,
    },
    validationSchema: actividadValidationSchema,
    onSubmit: (values, { resetForm }) => {
      values.peso = 100;

      if (file) {
        ImagenesService.upload(file)
          .then((response) => {
            values.foto_especialista = response.data;
          })
          .catch((error) => console.log(error));
      }

      dispatch(updateActividad(values));
      setFile();
      setImage("");
      resetForm();
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
