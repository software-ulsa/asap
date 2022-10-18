import { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
//import { Field, useFormik } from "formik";
import { PhotoCameraRounded } from "@mui/icons-material";
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
import { Close } from "@mui/icons-material";
import { blue, green } from "@mui/material/colors";

import * as yup from "yup";
import { Formik } from "formik";

import NotaService from "../../services/NotaService";
import ImagenesService from "../../services/ImagesService";

const EditarNota = ({ open, handleClose, notify, nota }) => {
  const [image, setImage] = useState();
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

  useEffect(() => {
    if (open) {
      if (nota.foto_principal) {
        ImagenesService.get(nota.foto_principal)
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setImage();
      }

      if (nota.foto_thumbnail) {
        ImagenesService.get(nota.foto_thumbnail)
          .then((url) => {
            setImageThumb(url);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setImageThumb();
      }
    } 
  }, [open]);

  const guardarNota = (values) => {
    NotaService.updateNota(values)
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
          const fileThumbnail = e.target.files[0];
          if (fileThumbnail) {
            setImageThumb(URL.createObjectURL(fileThumbnail));
            setFileThumbnail(fileThumbnail);
          }
        }}
        hidden
      ></TextField>
      <DialogTitle>Editar nota</DialogTitle>
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
      <Formik
        initialValues={{
          id: nota?.id || -1,
          titulo: nota?.titulo || "",
          tema: nota?.tema || "",
          contenido: nota?.contenido || "",
          palabras_clave: nota?.palabras_clave || "",
        }}
        validationSchema={yup.object({
            titulo: yup.string().required("titulo requerido"),
            tema: yup.string().required("tema requerido"),
            contenido: yup.string().required("contenido requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (palabras.length > 0) {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.foto_principal = response.data;
                guardarNota(values);
              })
              .catch((error) => console.log(error));
          } 

          if (fileThumbnail) {
            ImagenesService.upload(fileThumbnail)
              .then((response) => {
                values.foto_thumbnail = response.data;
                guardarNota(values);
              })
              .catch((error) => console.log(error));
          } 
          
          setFile();
          setImage("");
          setFileThumbnail();
          setImageThumb("");
          setSubmitting(false);
          handleClose();
        }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
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
                name="tema"
                label="Tema"
                variant="outlined"
                value={props.values.tema}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                    props.touched.tema &&
                  Boolean(props.errors.tema)
                }
                helperText={
                    props.touched.tema && props.errors.tema
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
                value={props.values.contenido}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.contenido && Boolean(props.errors.contenido)}
                helperText={props.touched.contenido && props.errors.contenido}
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
                  Guardar
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancelar
                </Button>
              </Box>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditarNota;