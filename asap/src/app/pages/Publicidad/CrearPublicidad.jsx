import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
  Grid,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close, PhotoCameraRounded } from "@mui/icons-material";

import { createPublicidad } from "../../services/PublicidadService";

import { publicidadValidationSchema } from "../../utils/validation";
import { emptyPublicidad } from "../../utils/initialStates";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const CrearPublicidad = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState("");
  const [mainFile, setMainFile] = useState();

  const formik = useFormik({
    initialValues: { emptyPublicidad },
    validationSchema: publicidadValidationSchema,
    onSubmit: (values, { resetForm }) => {
      values.imagen = "null";
      dispatch(createPublicidad(values));
      resetForm();
      handleClose();
    },
  });

  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar publicidad</DialogTitle>
      <Box position="absolute" top={0} right={0} paddingTop={1} paddingRight={1}>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="descripcion"
                label="Descripcion de la publicidad"
                variant="outlined"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                helperText={formik.touched.descripcion && formik.errors.descripcion}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="empresa"
                label="Empresa"
                variant="outlined"
                value={formik.values.empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.empresa && Boolean(formik.errors.empresa)}
                helperText={formik.touched.empresa && formik.errors.empresa}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="correo_empresa"
                label="Correo de la empresa"
                variant="outlined"
                value={formik.values.correo_empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.correo_empresa && Boolean(formik.errors.correo_empresa)}
                helperText={formik.touched.correo_empresa && formik.errors.correo_empresa}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Url a la empresa"
                name="url_empresa"
                variant="outlined"
                value={formik.values.url_empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.url_empresa && Boolean(formik.errors.url_empresa)}
                helperText={formik.touched.url_empresa && formik.errors.url_empresa}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label">Fecha inicio</Typography>
              <TextField
                type="date"
                color="info"
                fullWidth
                name="fecha_inicio"
                label=""
                variant="outlined"
                value={formik.values.fecha_inicio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fecha_inicio && Boolean(formik.errors.fecha_inicio)}
                helperText={formik.touched.fecha_inicio && formik.errors.fecha_inicio}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label">Fecha fin</Typography>
              <TextField
                type="date"
                color="info"
                fullWidth
                name="fecha_fin"
                label=""
                variant="outlined"
                value={formik.values.fecha_fin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fecha_fin && Boolean(formik.errors.fecha_fin)}
                helperText={formik.touched.fecha_fin && formik.errors.fecha_fin}
              />
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="activo"
                      checked={formik.values.activo}
                      onChange={(event) => formik.setFieldValue("activo", event.target.checked)}
                    />
                  }
                  label="Activo"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="label">Imagen de publicidad</Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <input
                  type="file"
                  accept="image/*"
                  id="subirImagen"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setMainImage(URL.createObjectURL(file));
                      setMainFile(file);
                    }
                  }}
                  hidden
                ></input>
                <IconButton
                  onClick={doClickOnInput}
                  disableFocusRipple
                  disableTouchRipple
                  disableRipple
                >
                  <Avatar
                    sx={{
                      bgcolor: grey[900],
                      height: "300px",
                      width: "300px",
                    }}
                    src={mainImage}
                  >
                    <PhotoCameraRounded />
                  </Avatar>
                </IconButton>
              </Box>
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
              disabled={!(formik.isValid && formik.dirty)}
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

export default CrearPublicidad;
