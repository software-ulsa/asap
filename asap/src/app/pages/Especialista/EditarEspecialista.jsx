import { useEffect, useState } from "react";

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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";

import * as yup from "yup";
import { Formik } from "formik";

import EspecialistaService from "../../services/EspecialistaService";
import ImagenesService from "../../services/ImagesService";

const EditarEspecialista = ({ open, handleClose, notify, especialista }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [image, setImage] = useState();
  const [file, setFile] = useState();

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  useEffect(() => {
    if (open) {
      if (especialista.foto_especialista) {
        ImagenesService.get(especialista.foto_especialista)
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setImage();
      }
    }
  }, [open]);

  const guardarEspecialista = (values) => {
    EspecialistaService.updateEspecialista(values)
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
      <DialogTitle>Editar especialista</DialogTitle>
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
          id: especialista?.id || -1,
          nombre: especialista?.nombre || "",
          segundo_nombre: especialista?.segundo_nombre || "",
          ape_paterno: especialista?.ape_paterno || "",
          ape_materno: especialista?.ape_materno || "",
          edad: especialista?.edad || "",
          sexo: especialista?.sexo || "",
          correo: especialista?.correo || "",
          telefono: especialista?.telefono || "",
          telefono_casa: especialista?.telefono_casa || "",
          especialidad: especialista?.especialidad || "",
          area_especialidad: especialista?.area_especialidad || "",
          cedula: especialista?.cedula || "",
        }}
        validationSchema={yup.object({
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
          area_especialidad: yup
            .string()
            .required("Área de especialidad requerida"),
          telefono: yup
            .string()
            .matches(phoneRegExp, "Teléfono no váildo")
            .required("Teléfono requerido"),
          correo: yup.string().email().required("Correo requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.foto_especialista = response.data;
                guardarEspecialista(values);
              })
              .catch((error) => console.log(error));
          } else {
            guardarEspecialista(values);
          }
          setFile();
          setImage("");
          setSubmitting(false);
          handleClose();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
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
                        alt={props.values.nombre}
                        src={image}
                      ></Avatar>
                    </IconButton>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    variant="outlined"
                    value={props.values.nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.nombre && Boolean(props.errors.nombre)}
                    helperText={props.touched.nombre && props.errors.nombre}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    color="info"
                    fullWidth
                    name="segundo_nombre"
                    label="Segundo nombre"
                    variant="outlined"
                    value={props.values.segundo_nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Apellido paterno"
                    name="ape_paterno"
                    variant="outlined"
                    value={props.values.ape_paterno}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.ape_paterno &&
                      Boolean(props.errors.ape_paterno)
                    }
                    helperText={
                      props.touched.ape_paterno && props.errors.ape_paterno
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
                    value={props.values.ape_materno}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.ape_materno &&
                      Boolean(props.errors.ape_materno)
                    }
                    helperText={
                      props.touched.ape_materno && props.errors.ape_materno
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
                    value={props.values.edad}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.edad && Boolean(props.errors.edad)}
                    helperText={props.touched.edad && props.errors.edad}
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
                      value={props.values.sexo}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={props.touched.sexo && Boolean(props.errors.sexo)}
                      helperText={props.touched.sexo && props.errors.sexo}
                      label="Sexo"
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Femenino">Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Divider>Contacto</Divider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Teléfono móvil"
                    name="telefono"
                    variant="outlined"
                    value={props.values.telefono}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.telefono && Boolean(props.errors.telefono)
                    }
                    helperText={props.touched.telefono && props.errors.telefono}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Teléfono de casa"
                    name="telefono_casa"
                    variant="outlined"
                    value={props.values.telefono_casa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
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
                    value={props.values.correo}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.correo && Boolean(props.errors.correo)}
                    helperText={props.touched.correo && props.errors.correo}
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
                    value={props.values.especialidad}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.especialidad &&
                      Boolean(props.errors.especialidad)
                    }
                    helperText={
                      props.touched.especialidad && props.errors.especialidad
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
                    value={props.values.area_especialidad}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.area_especialidad &&
                      Boolean(props.errors.area_especialidad)
                    }
                    helperText={
                      props.touched.area_especialidad &&
                      props.errors.area_especialidad
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
                    value={props.values.cedula}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.cedula && Boolean(props.errors.cedula)}
                    helperText={props.touched.cedula && props.errors.cedula}
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

export default EditarEspecialista;
