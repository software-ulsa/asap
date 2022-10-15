import * as yup from "yup";
import { useFormik } from "formik";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { deepOrange } from "@mui/material/colors";
import { Close, PhotoCameraRounded } from "@mui/icons-material";

import EspecialistaService from "../../services/EspecialistaService";
import ImagesService from "../../services/ImagesService";
import { useState } from "react";

const CrearEspecialista = ({ open, handleClose, notify }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  const guardarEspecialista = (values) => {
    EspecialistaService.createEspecialista(values)
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
    nombre: yup.string().required("Nombre requerido"),
    ape_paterno: yup.string().required("Apellido paterno requerido"),
    ape_materno: yup.string().required("Apellido materno requerido"),
    edad: yup
      .number()
      .positive("La edad debe ser mayor a 0")
      .integer("La edad debe ser un número")
      .required("Edad requerida"),
    sexo: yup.string().required("Sexo requerido"),
    especialidad: yup.string().required("Especialidad requerida"),
    cedula: yup
      .string()
      .min(8, "Cédula no válida")
      .max(8, "Cédula no válida")
      .required("Cédula requerida"),
    area_especialidad: yup.string().required("Área de especialidad requerida"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Teléfono no váildo")
      .required("Teléfono requerido"),
    correo: yup.string().email().required("Correo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      segundo_nombre: "",
      ape_paterno: "",
      ape_materno: "",
      edad: 0,
      sexo: "",
      foto_especialista: "",
      especialidad: "",
      cedula: "",
      area_especialidad: "",
      telefono: "",
      telefono_casa: "",
      correo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (file) {
        ImagesService.upload(file)
          .then((response) => {
            ImagesService.get(response.data)
              .then((url) => {
                values.foto_especialista = url;
                guardarEspecialista(values);
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      } else {
        guardarEspecialista(values);
      }
      setFile();
      setImage("");
      resetForm();
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
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
      <DialogTitle>Agregar especialista</DialogTitle>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider>
                <IconButton onClick={doClickOnInput}>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      height: "150px",
                      width: "150px",
                    }}
                    src={image}
                  >
                    <PhotoCameraRounded />
                  </Avatar>
                </IconButton>
              </Divider>
            </Grid>
            <Grid item xs={12}>
              <Divider>Informaci&oacute;n b&aacute;sica</Divider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="info"
                fullWidth
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="info"
                fullWidth
                name="segundo_nombre"
                label="Segundo nombre"
                variant="outlined"
                value={formik.values.segundo_nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Apellido paterno"
                name="ape_paterno"
                variant="outlined"
                value={formik.values.ape_paterno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ape_paterno &&
                  Boolean(formik.errors.ape_paterno)
                }
                helperText={
                  formik.touched.ape_paterno && formik.errors.ape_paterno
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Apellido materno"
                name="ape_materno"
                variant="outlined"
                value={formik.values.ape_materno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ape_materno &&
                  Boolean(formik.errors.ape_materno)
                }
                helperText={
                  formik.touched.ape_materno && formik.errors.ape_materno
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Edad"
                name="edad"
                variant="outlined"
                value={formik.values.edad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.edad && Boolean(formik.errors.edad)}
                helperText={formik.touched.edad && formik.errors.edad}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel color="info" id="lblSexo">
                  Sexo
                </InputLabel>
                <Select
                  labelId="lblSexo"
                  name="sexo"
                  color="info"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sexo && Boolean(formik.errors.sexo)}
                  helperText={formik.touched.sexo && formik.errors.sexo}
                  label="Sexo"
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider>Datos de contacto</Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Teléfono móvil"
                name="telefono"
                variant="outlined"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.telefono && Boolean(formik.errors.telefono)
                }
                helperText={formik.touched.telefono && formik.errors.telefono}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Teléfono de casa"
                name="telefono_casa"
                variant="outlined"
                value={formik.values.telefono_casa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Correo"
                name="correo"
                type="email"
                variant="outlined"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider>Profesi&oacute;n</Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Especialidad"
                name="especialidad"
                variant="outlined"
                value={formik.values.especialidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.especialidad &&
                  Boolean(formik.errors.especialidad)
                }
                helperText={
                  formik.touched.especialidad && formik.errors.especialidad
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Área de especialidad"
                name="area_especialidad"
                variant="outlined"
                value={formik.values.area_especialidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.area_especialidad &&
                  Boolean(formik.errors.area_especialidad)
                }
                helperText={
                  formik.touched.area_especialidad &&
                  formik.errors.area_especialidad
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Cédula"
                name="cedula"
                variant="outlined"
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cedula && Boolean(formik.errors.cedula)}
                helperText={formik.touched.cedula && formik.errors.cedula}
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

export default CrearEspecialista;
