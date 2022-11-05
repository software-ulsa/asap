import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  handleBack,
  handleClose,
  handleNext,
  rebootActiveStep,
} from "../../../reducers/ModalReducer";

import { Grid, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";

import { parseDate } from "../../../utils/utils";
import { cursoDetailValidationSchema } from "../../../utils/validation";

import InputField from "../../../components/InputField";
import InputSwitch from "../../../components/InputSwitch";
import InputArray from "../../../components/InputArray";

const Detalles = ({ curso, setCurso }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        status: curso?.status || false,
        fecha_inicio: parseDate(curso?.fecha_inicio),
        fecha_vencimiento: parseDate(curso?.fecha_vencimiento),
        palabras_clave: curso?.palabras_clave || [],
      }}
      validationSchema={cursoDetailValidationSchema}
      onSubmit={(values) => {
        setCurso((prev) => ({
          ...prev,
          status: values.status,
          fecha_inicio: values.fecha_inicio,
          fecha_vencimiento: values.fecha_vencimiento,
          palabras_clave: values.palabras_clave,
        }));
        dispatch(handleNext(3));
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="fecha_inicio"
              label="Fecha de inicio"
              type="date"
            />
            <InputField
              formik={props}
              field="fecha_vencimiento"
              label="Fecha de cierre"
              type="date"
            />
            <InputArray
              formik={props}
              field="palabras_clave"
              label="Palabras clave"
            />
            <InputSwitch formik={props} field="status" label="Activar curso" />
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Button
              variant="contained"
              color="info"
              onClick={() => dispatch(handleBack())}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!props.isValid}
              >
                Siguiente
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(rebootActiveStep());
                  dispatch(handleClose());
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Detalles;
