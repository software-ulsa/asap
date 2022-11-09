import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleBack, handleNext } from "../../reducers/ModalReducer";

import { Box, Button, Grid, Stack } from "@mui/material";

import { usuarioValidationSchema } from "../../utils/validation";

import InputField from "../Input/InputField";
import CarreraSelect from "../Select/CarreraSelect";

const Usuario = ({ isUpdating, item, setItem, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: item.username,
        password: "",
        carrera_id: item.carrera_id,
        matricula: item.matricula,
      }}
      validationSchema={usuarioValidationSchema(isUpdating)}
      onSubmit={(values) => {
        setItem((prev) => ({
          ...prev,
          username: values.username,
          password: values.password,
          carrera_id: values.carrera_id,
          matricula: values.matricula,
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

            <CarreraSelect formik={props} />
            <InputField
              formik={props}
              field="matricula"
              label="Matricula"
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

export default Usuario;
