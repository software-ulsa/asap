import {
  Grid,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close, PhotoCameraRounded } from "@mui/icons-material";

import * as yup from "yup";
import { useFormik } from "formik";

import CursoService from "../../services/CursoService";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import ImagenesService from "../../services/ImagesService";

const CrearCurso = ({ open, handleClose, notify }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const validationSchema = yup.object({
    titulo: yup.string().required("Titulo requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const guardarCurso = (values) => {
    CursoService.createCurso(values)
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

  const formik = useFormik({
    initialValues: { titulo: "", descripcion: "" },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      values.icono = "no-icon";
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
      setFile();
      setImage("");
      resetForm();
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear curso</DialogTitle>
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pl={2}
          >
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
        </Box>
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

export default CrearCurso;
