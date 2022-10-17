import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import {
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import UsuarioService from "../../services/UsuarioService";
import { useState } from "react";



const EditarUsuario = ({ open, handleClose, notify, usuario }) => {
const [usuarios, setUsuarios] = useState([])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar usuario</DialogTitle>
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
          id: usuario?.id || -1,
          nombre: usuario?.nombre || "",
          segundo_nombre: usuario?.segundo_nombre || "",
          ape_paterno: usuario?.ape_paterno || "",
          ape_materno: usuario?.ape_materno || "",
          correo: usuario?.correo || "",
          password: usuario?.password || "",
          telefono: usuario?.telefono || "",
          edad: usuario?.edad || "",
          matricula: usuario?.matricula || "",
          sexo: usuario?.sexo || "",
          id_rol: usuario?.id_rol || "",
        }}
        validationSchema={yup.object({
          nombre: yup.string().required("Nombre requerido"),
          ape_paterno: yup.string().required("Apellido paterno requerida"),
          ape_materno: yup.string().required("Apellido materno requerido"),
          correo: yup.string().required("Correo requerido"),
          password: yup.string().required("Password requerido"),
          telefono: yup.string().required("Telefono requerido"),
          matricula: yup.string().required("Matricula requerida"),
          edad: yup.string().required("Edad requerida"),
          sexo: yup.string().required("Sexo requerido"),
          id_rol: yup.string().required("Rol requerido"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.id = usuario?.id;
          UsuarioService.updateUser(values)
            .then((response) => {
              if (response.message) {
                setSubmitting(false);
                notify("success", response.message);
              } else {
                notify("error", response.error);
              }
            })
            .catch((error) => {
              notify("error", error);
            });
          handleClose();
        }}
      >
        {(props) => (
      <form onSubmit={props.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
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
              <Divider>Datos para el registro</Divider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Matricula"
                name="matricula"
                variant="outlined"
                value={props.values.matricula}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                    props.touched.matricula && Boolean(props.errors.matricula)
                }
                helperText={props.touched.matricula && props.errors.matricula}
              />
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
              <TextField
                color="info"
                fullWidth
                label="Rol Id"
                name="id_rol"
                variant="outlined"
                value={props.values.id_rol}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
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

export default EditarUsuario;