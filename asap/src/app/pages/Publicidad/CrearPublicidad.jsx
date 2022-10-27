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
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import { createPublicidad } from "../../services/PublicidadService";

import { publicidadValidationSchema } from "../../utils/validation";
import { emptyPublicidad } from "../../utils/initialStates";

const CrearPublicidad = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { emptyPublicidad },
    validationSchema: publicidadValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createPublicidad(values));
      resetForm();
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar publicidad</DialogTitle>
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
                label="Descripcion de empresa"
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
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="dot_empresa"
                label="Dot de empresa"
                variant="outlined"
                value={formik.values.dot_empresa}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dot_empresa &&
                  Boolean(formik.errors.dot_empresa)
                }
                helperText={
                  formik.touched.dot_empresa && formik.errors.dot_empresa
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="url"
                label="URL"
                variant="outlined"
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Grid>

            <Grid item xs={12}>
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
                error={
                  formik.touched.fecha_inicio &&
                  Boolean(formik.errors.fecha_inicio)
                }
                helperText={
                  formik.touched.fecha_inicio && formik.errors.fecha_inicio
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                color="info"
                fullWidth
                name="fecha_vencimiento"
                label=""
                variant="outlined"
                value={formik.values.fecha_vencimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fecha_vencimiento &&
                  Boolean(formik.errors.fecha_vencimiento)
                }
                helperText={
                  formik.touched.fecha_vencimiento &&
                  formik.errors.fecha_vencimiento
                }
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
