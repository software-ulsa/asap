import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleBack, handleNext } from "../../reducers/ModalReducer";

import { Box, Button, Grid, Stack } from "@mui/material";

import { usuarioValidationSchema } from "../../utils/validation";

import InputField from "../Input/InputField";
import EspecialidadesSelect from "../Select/EspecialidadesSelect";

const Usuario = ({ isUpdating, item, setItem, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: item.username,
        password: "",
        especialidad_id: item.especialidad_id,
        cedula_prof: item.cedula_prof,
      }}
      validationSchema={usuarioValidationSchema(isUpdating)}
      onSubmit={(values) => {
        setItem((prev) => ({
          ...prev,
          username: values.username,
          password: values.password,
          especialidad_id: values.especialidad_id,
          cedula_prof: values.cedula_prof,
        }));

        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="username"
              label="Nombre de usuario"
              type="text"
            />
            <InputField
              formik={props}
              field="password"
              label={isUpdating ? "Nueva contraseña" : "Contraseña"}
              type="password"
              required={!isUpdating}
            />

            <InputField
              formik={props}
              field="cedula_prof"
              label="Cédula profesional"
              type="text"
            />
            <EspecialidadesSelect formik={props} />
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

export default Usuario;
