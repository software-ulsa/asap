import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../reducers/ModalReducer";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import { createActividad } from "../../services/ActividadService";

import InputField from "../../components/Input/InputField";

const CrearActividad = ({ cursoId }) => {
  const dispatch = useDispatch();
  const { openCreate } = useSelector((state) => state.modal);

  const validationSchema = yup.object({
    titulo: yup.string().required("Titulo requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    initialValues: {
      titulo: "",
      descripcion: "",
      url_media: "",
      curso_id: cursoId,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createActividad(values));
      dispatch(handleClose());
      resetForm();
    },
  });

  return (
    <Dialog
      open={openCreate}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Agregar actividad</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton
          onClick={() => {
            formik.resetForm();
            dispatch(handleClose());
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container rowGap={2}>
            <InputField
              formik={formik}
              field="titulo"
              label="Titulo"
              type="text"
            />
            <InputField
              formik={formik}
              field="descripcion"
              label="Descripcion"
              type="text"
            />
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
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                formik.resetForm();
                dispatch(handleClose());
              }}
            >
              Cancelar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrearActividad;
