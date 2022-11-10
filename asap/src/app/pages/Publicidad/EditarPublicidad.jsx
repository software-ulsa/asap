import { useDispatch } from "react-redux";
import { Formik } from "formik";

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

import { updatePublicidad } from "../../services/PublicidadService";

import { publicidadValidationSchema } from "../../utils/validation";

const EditarPublicidad = ({ open, handleClose, publicidad }) => {
  const dispatch = useDispatch();
  const dateInicio = new Date(publicidad?.fecha_inicio || "2022-10-28")
    .toISOString()
    .split("T")[0]
    .replaceAll("/", "-");
  const dateFin = new Date(publicidad?.fecha_fin || "2022-10-28")
    .toISOString()
    .split("T")[0]
    .replaceAll("/", "-");

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
          empresa: publicidad?.empresa || "",
          correo_empresa: publicidad?.correo_empresa || "",
          url_empresa: publicidad?.url_empresa || "",
          fecha_inicio: dateInicio || "",
          fecha_fin: dateFin || "",
        }}
        validationSchema={publicidadValidationSchema}
        onSubmit={(values) => {
          dispatch(updatePublicidad(values));
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
                    name="empresa"
                    label="Dot de empresa"
                    variant="outlined"
                    value={props.values.empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.empresa &&
                      Boolean(props.errors.empresa)
                    }
                    helperText={
                      props.touched.empresa && props.errors.empresa
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    label="Email"
                    name="correo_empresa"
                    variant="outlined"
                    value={props.values.correo_empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.correo_empresa && Boolean(props.errors.correo_empresa)}
                    helperText={props.touched.correo_empresa && props.errors.correo_empresa}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="info"
                    fullWidth
                    name="url_empresa"
                    label="Url de la empresa"
                    variant="outlined"
                    value={props.values.url_empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.url_empresa && Boolean(props.errors.url_empresa)}
                    helperText={props.touched.url_empresa && props.errors.url_empresa}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    color="info"
                    fullWidth
                    name="fecha_inicio"
                    label="Fecha de inicio"
                    variant="outlined"
                    value={props.values.fecha_inicio}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.fecha_inicio &&
                      Boolean(props.errors.fecha_inicio)
                    }
                    helperText={
                      props.touched.fecha_inicio && props.errors.fecha_inicio
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="date"
                    color="info"
                    fullWidth
                    name="fecha_fin"
                    label="Fecha de vencimiento"
                    variant="outlined"
                    value={props.values.fecha_fin}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={
                      props.touched.fecha_fin &&
                      Boolean(props.errors.fecha_fin)
                    }
                    helperText={
                      props.touched.fecha_fin &&
                      props.errors.fecha_fin
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
                  disabled={!props.isValid}
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
