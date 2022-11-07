import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  handleBack,
  handleClose,
  handleNext,
  rebootActiveStep,
} from "../../reducers/ModalReducer";

import { Box, Button, Grid, Stack } from "@mui/material";

import { usuarioValidationSchema } from "../../utils/validation";

import InputField from "../Input/InputField";
import RolSelect from "../Select/RolSelect";
import InputSwitch from "../Input/InputSwitch";

const Usuario = ({ item, setItem, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        nombre_usuario: item?.usuario.username || "",
        rol_id: item?.usuario.rol_id || "Elegir uno",
        activo: item?.usuario.activo || false,
        password: "",
      }}
      validationSchema={usuarioValidationSchema(true)}
      onSubmit={(values) => {
        console.log(values);
        // setItem((prev) => ({
        //   ...prev,
        //   nombre_usuario: values.nombre_usuario,
        //   password: values.password,
        //   activo: values.activo,
        //   rol_id: values.rol_id,
        // }));

        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="nombre_usuario"
              label="Nombre de usuario"
              type="text"
            />
            <InputField
              formik={props}
              field="password"
              label="Contraseña"
              type="password"
            />
            <RolSelect formik={props} />
            <InputSwitch formik={props} field="activo" label="Activo" />
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
