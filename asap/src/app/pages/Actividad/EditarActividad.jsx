import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../reducers/ModalReducer";

import * as yup from "yup";
import { useFormik } from "formik";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import InputField from "../../components/Input/InputField";

import { updateActividad } from "../../services/ActividadService";
import ImagenesService from "../../services/ImagesService";

const EditarActividad = ({ actividad, cursoId }) => {
  const dispatch = useDispatch();
  const { openEdit } = useSelector((state) => state.modal);

  const validationSchema = yup.object({
    titulo: yup.string().required("Titulo requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: actividad?.id || -1,
      titulo: actividad?.titulo || "",
      descripcion: actividad?.descripcion || "",
      url_media: actividad?.url_media || "",
      curso_id: actividad?.curso_id || cursoId,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(updateActividad(values));
      dispatch(handleClose());
    },
  });

  return (
    <Dialog
      open={openEdit}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Editar actividad</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton
          onClick={() => {
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
              Guardar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
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

export default EditarActividad;
