import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleBack, handleNext } from "../../../reducers/ModalReducer";

import { Grid, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";

import { cursoDetailValidationSchema } from "../../../utils/validation";

import InputField from "../../../components/Input/InputField";
import InputSwitch from "../../../components/Input/InputSwitch";
import InputArray from "../../../components/Input/InputArray";
import CursoCategoriaSelect from "../../../components/Select/CursoCategoriaSelect";

const Detalles = ({ curso, setCurso, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        activo: curso.activo,
        fecha_inicio: curso.fecha_inicio,
        fecha_fin: curso.fecha_fin,
        palabras_clave: curso.palabras_clave,
        categoria_id: curso.categoria_id,
      }}
      validationSchema={cursoDetailValidationSchema}
      onSubmit={(values) => {
        setCurso((prev) => ({
          ...prev,
          activo: values.activo,
          fecha_inicio: values.fecha_inicio,
          fecha_fin: values.fecha_fin,
          palabras_clave: values.palabras_clave,
          categoria_id: values.categoria_id,
        }));
        dispatch(handleNext());
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
              field="fecha_fin"
              label="Fecha de cierre"
              type="date"
            />
            <InputArray
              formik={props}
              field="palabras_clave"
              label="Palabras clave"
            />
            <CursoCategoriaSelect formik={props} />
            <InputSwitch formik={props} field="activo" label="Activar curso" />
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

              <Button variant="contained" color="error" onClick={cancelAction}>
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
