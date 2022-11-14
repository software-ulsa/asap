import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../../reducers/ModalReducer";

import { useFormik } from "formik";
import * as yup from "yup";

import {
  Grid,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import { createCategoria } from "../../../services/CategoriaService";

import InputField from "../../../components/Input/InputField";

const CrearCategoria = () => {
  const dispatch = useDispatch();
  const { openCreate } = useSelector((state) => state.modal);

  const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    initialValues: { nombre: "", descripcion: "" },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(createCategoria(values));
      resetForm();
      dispatch(handleClose());
    },
  });

  return (
    <Dialog
      open={openCreate}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Agregar categoria</DialogTitle>
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
              field="nombre"
              label="Nombre"
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

export default CrearCategoria;
