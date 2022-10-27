import { Formik } from "formik";
import * as yup from "yup";

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

import { useDispatch, useSelector } from "react-redux";
import { updateRol } from "../../services/RolService";

const EditarRol = ({ open, handleClose, notify, rol }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.roles);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar rol</DialogTitle>
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
          id: rol?.id || -1,
          nombre: rol?.nombre || "",
          descripcion: rol?.descripcion || "",
        }}
        validationSchema={yup.object({
          nombre: yup.string().required("Nombre requerido"),
          descripcion: yup.string().required("Descripción requerida"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          values.id = rol?.id;
          setSubmitting(true);
          dispatch(updateRol(values));
          setSubmitting(false);
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
                    label="Descripcion"
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
              </Grid>
            </DialogContent>
            <DialogActions>
              <Box paddingBottom={2} paddingRight={2}>
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  color="warning"
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

export default EditarRol;
