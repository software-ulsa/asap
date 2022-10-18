import { useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";

import ChipInput from "material-ui-chip-input";

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
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close, PhotoCameraRounded } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";

import NotaService from "../../services/NotaService";
import ImagenesService from "../../services/ImagesService";

const CrearNota = ({ open, handleClose, notify }) => {
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const [imageThumb, setImageThumb] = useState("");
  const [fileThumbnail, setFileThumbnail] = useState();
  const [palabras, setPalabras] = useState([]);

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const doClickOnThumbnail = () => {
    var inputThumbnail = document.getElementById("subirThumbnail");
    inputThumbnail?.click();
  };

  const handleAddChip = (chip) => {
    setPalabras((oldArray) => [...oldArray, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    setPalabras(palabras.filter((item, i) => i !== index));
  };

  const guardarNota = async (values) => {
    await NotaService.createNota(values)
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
    tema: yup.string().required("Tema requerido"),
    contenido: yup.string().required("Contenido requerido"),
  });

  const formik = useFormik({
    initialValues: {
      titulo: "",
      tema: "",
      contenido: "",
      foto_principal: "",
      foto_thumbnail: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (palabras.length > 0) {
        if (file) {
          await ImagenesService.upload(file)
            .then((response) => {
              values.foto_principal = response.data;
            })
            .catch((error) => console.log(error));
        }

        if (fileThumbnail) {
          await ImagenesService.upload(fileThumbnail)
            .then((response) => {
              values.foto_thumbnail = response.data;
            })
            .catch((error) => console.log(error));
        }

        values.palabras_clave = palabras;

        guardarNota(values);
        setFile();
        setImage("");

        setFileThumbnail();
        setImageThumb("");
        setPalabras([]);

        resetForm();
        setSubmitting(false);
        handleClose();
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <input
        hidden
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
      ></input>
      <input
        hidden
        type="file"
        accept="image/*"
        id="subirThumbnail"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImageThumb(URL.createObjectURL(file));
            setFileThumbnail(file);
          }
        }}
      ></input>
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
                <IconButton onClick={doClickOnThumbnail}>
                  <Avatar
                    sx={{
                      bgcolor: blue[500],
                      height: "150px",
                      width: "150px",
                    }}
                    variant="rounded"
                    src={imageThumb}
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
                error={formik.touched.tema && Boolean(formik.errors.tema)}
                helperText={formik.touched.tema && formik.errors.tema}
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
                error={
                  formik.touched.contenido && Boolean(formik.errors.contenido)
                }
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
                value={palabras}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
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
