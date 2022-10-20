import * as yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton } from "@mui/material";
import { Close, YouTube } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import PublicidadService from "../../services/PublicidadService";


const EditarPublicidad = ({ open, handleClose, notify, publicidad }) => {
    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    descripcion: yup.string().required("Descripción de empresa requerida"),
    dot_empresa: yup.string().required("Dot de empresa requerida"),
    email: yup.string().email("Correo no válido").required("Correo requerido"),
    url: yup.string().required("URL requerido"),
    fecha_inicio: yup.string().required("Fecha de inicio requerido"),
    fecha_vencimiento: yup.string().required("Fecha de vencimiento requerido"),
  });

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar publicidad</DialogTitle>
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
          id: publicidad?.id || -1,
          nombre: publicidad?.nombre || "",
          descripcion: publicidad?.descripcion || "",
          dot_empresa: publicidad?.dot_empresa || "",
          email: publicidad?.email || "",
          url: publicidad?.url || "",
          fecha_inicio: publicidad?.fecha_inicio || "",
          fecha_vencimiento: publicidad?.fecha_vencimiento || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            values.id = publicidad?.id;
            PublicidadService.updatePublicidad(values)
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
            <Grid container rowGap={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                <TextField
                    color="info"
                    fullWidth
                    name="descripcion"
                    label="Descripcion de empresa"
                    variant="outlined"
                    value={props.values.descripcion}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                        props.touched.descripcion &&
                    Boolean(props.errors.descripcion)
                    }
                    helperText={
                    props.touched.descripcion && props.errors.descripcion
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
                    value={props.values.dot_empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                        props.touched.dot_empresa &&
                    Boolean(props.errors.dot_empresa)
                    }
                    helperText={
                    props.touched.dot_empresa && props.errors.dot_empresa
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
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.email && Boolean(props.errors.email)}
                    helperText={props.touched.email && props.errors.email}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    color="info"
                    fullWidth
                    name="url"
                    label="URL"
                    variant="outlined"
                    value={props.values.url}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.url && Boolean(props.errors.url)}
                    helperText={props.touched.url && props.errors.url}
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
                    value={props.values.fecha_inicio}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.fecha_inicio && Boolean(props.errors.fecha_inicio)}
                    helperText={props.touched.fecha_inicio && props.errors.fecha_inicio}
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
                    value={props.values.fecha_vencimiento}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.fecha_vencimiento && Boolean(props.errors.fecha_vencimiento)}
                    helperText={props.touched.fecha_vencimiento && props.errors.fecha_vencimiento}
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

export default EditarPublicidad;
