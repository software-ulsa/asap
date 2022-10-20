import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import PublicidadService from "../../services/PublicidadService";


const CrearPublicidad = ({ open, handleClose, notify }) => {
  
  const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    descripcion: yup.string().required("Descripción de empresa requerida"),
    dot_empresa: yup.string().required("Dot de empresa requerida"),
    email: yup.string().email("Correo no válido").required("Correo requerido"),
    url: yup.string().required("URL requerido"),
    fecha_inicio: yup.string().required("Fecha de inicio requerido"),
    fecha_vencimiento: yup.string().required("Fecha de vencimiento requerido"),
  });

  const formik = useFormik({
    initialValues: { 
      id: "",
      nombre: "",
      descripcion: "",
      dot_empresa: "",
      email: "",
      url: "",
      fecha_inicio: "",
      fecha_vencimiento:  "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      PublicidadService.createPublicidad(values)
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
                error={formik.touched.fecha_inicio && Boolean(formik.errors.fecha_inicio)}
                helperText={formik.touched.fecha_inicio && formik.errors.fecha_inicio}
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
                error={formik.touched.fecha_vencimiento && Boolean(formik.errors.fecha_vencimiento)}
                helperText={formik.touched.fecha_vencimiento && formik.errors.fecha_vencimiento}
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

export default CrearPublicidad;
