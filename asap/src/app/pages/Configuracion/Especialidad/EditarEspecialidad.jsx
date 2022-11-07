import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../../reducers/ModalReducer";

import { Formik } from "formik";
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

import { updateEspecialidad } from "../../../services/EspecialidadService";

import InputField from "../../../components/Input/InputField";

const EditarEspecialidad = ({ especialidad }) => {
  const dispatch = useDispatch();
  const { openEdit } = useSelector((state) => state.modal);

  return (
    <Dialog
      open={openEdit}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Editar especialidad</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={() => dispatch(handleClose())}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          id: especialidad?.id || -1,
          nombre: especialidad?.nombre || "",
          tipo: especialidad?.tipo || "",
        }}
        validationSchema={yup.object({
          nombre: yup.string().required("Nombre requerido"),
          tipo: yup.string().required("Tipo de especialidad requerido"),
        })}
        onSubmit={(values) => {
          dispatch(updateEspecialidad(values));
          dispatch(handleClose());
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogContent>
              <Grid container rowGap={2}>
                <InputField
                  formik={props}
                  field="nombre"
                  label="Nombre"
                  type="text"
                />
                <InputField
                  formik={props}
                  field="tipo"
                  label="Tipo de especialidad"
                  type="text"
                />
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
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(handleClose())}
                >
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

export default EditarEspecialidad;
