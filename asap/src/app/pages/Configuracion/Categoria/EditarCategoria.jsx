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

import { updateCategoria } from "../../../services/CategoriaService";

import InputField from "../../../components/Input/InputField";
import TipoCategoriaSelect from "../../../components/Select/TipoCategoriaSelect";

const EditarCategoria = ({ categoria }) => {
  const dispatch = useDispatch();
  const { openEdit } = useSelector((state) => state.modal);

  return (
    <Dialog
      open={openEdit}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Editar categoria</DialogTitle>
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
          id: categoria?.id || -1,
          nombre: categoria?.nombre || "",
          descripcion: categoria?.descripcion || "",
          tipo: categoria?.tipo || "Elegir uno",
        }}
        validationSchema={yup.object({
          nombre: yup.string().required("Nombre requerido"),
          descripcion: yup.string().required("Descripción requerida"),
          tipo: yup
            .string()
            .oneOf(["Nota", "Curso"])
            .label("Elegir uno")
            .required("Tipo de categoria requerido"),
        })}
        onSubmit={(values) => {
          dispatch(updateCategoria(values));
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
                  field="descripcion"
                  label="Descripcion"
                  type="text"
                />
                <TipoCategoriaSelect formik={props} />
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

export default EditarCategoria;
