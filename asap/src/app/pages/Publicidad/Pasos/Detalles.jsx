import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleBack, handleNext } from "../../../reducers/ModalReducer";

import { Grid, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";

import { publicidadDetailValidationSchema } from "../../../utils/validation";

import InputField from "../../../components/Input/InputField";

const Detalles = ({ publicidad, setPublicidad, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        empresa: publicidad.empresa,
        url_empresa: publicidad.url_empresa,
        correo_empresa: publicidad.correo_empresa,
      }}
      validationSchema={publicidadDetailValidationSchema}
      onSubmit={(values) => {
        setPublicidad((prev) => ({
          ...prev,
          empresa: values.empresa,
          url_empresa: values.url_empresa,
          correo_empresa: values.correo_empresa,
        }));
        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="empresa"
              label="Nombre de la empresa"
              type="text"
            />
            <InputField
              formik={props}
              field="url_empresa"
              label="Sitio de la empresa"
              type="text"
            />
            <InputField
              formik={props}
              field="correo_empresa"
              label="Correo de la empresa"
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
