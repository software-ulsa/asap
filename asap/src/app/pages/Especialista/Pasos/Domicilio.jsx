import { Box, Button, Grid, Stack } from "@mui/material";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import InputField from "../../../components/Input/InputField";
import EstadoSelect from "../../../components/Select/EstadoSelect";
import { handleBack, handleNext } from "../../../reducers/ModalReducer";

import { domicilioValidationSchema } from "../../../utils/validation";

const Contacto = ({ especialista, setEspecialista, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        calle: especialista?.calle || "",
        colonia: especialista?.colonia || "",
        estado: especialista?.estado || "Elige uno",
        codigo_postal: especialista?.codigo_postal || "",
      }}
      validationSchema={domicilioValidationSchema}
      onSubmit={(values) => {
        setEspecialista((prev) => ({
          ...prev,
          calle: values.calle,
          colonia: values.colonia,
          estado: values.estado,
          codigo_postal: values.codigo_postal,
        }));
        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="calle"
              label="Calle"
              type="text"
            />
            <InputField
              formik={props}
              field="colonia"
              label="Colonia"
              type="text"
            />
            <EstadoSelect formik={props} />
            <InputField
              formik={props}
              field="codigo_postal"
              label="Código Postal"
              type="text"
            />
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
              color="primary"
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

export default Contacto;
