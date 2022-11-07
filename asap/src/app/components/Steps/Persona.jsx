import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleNext } from "../../reducers/ModalReducer";

import { Box, Button, Grid, Stack } from "@mui/material";

import { parseDate } from "../../utils/utils";
import { personaValidationSchema } from "../../utils/validation";

import InputField from "../Input/InputField";
import SexoSelect from "../Select/SexoSelect";

const Persona = ({ isUpdating, item, setItem, cancelAction }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: item.id,
        nombre: item.nombre,
        ape_paterno: item.ape_paterno,
        ape_materno: item.ape_materno,
        fecha_nac: parseDate(item.fecha_nac),
        sexo: item.sexo,
        telefono: item.telefono,
        correo: item.correo,
      }}
      validationSchema={personaValidationSchema}
      onSubmit={(values) => {
        setItem((prev) => ({
          ...prev,
          nombre: values.nombre,
          ape_paterno: values.ape_paterno,
          ape_materno: values.ape_materno,
          fecha_nac: values.fecha_nac,
          sexo: values.sexo,
          telefono: values.telefono,
          correo: values.correo,
        }));

        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="nombre"
              label="Nombre"
              type="text"
            />
            <InputField
              formik={props}
              field="ape_paterno"
              label="Apellido paterno"
              type="text"
            />
            <InputField
              formik={props}
              field="ape_materno"
              label="Apellido materno"
              type="text"
            />
            <InputField
              formik={props}
              field="fecha_nac"
              label="Fecha de nacimiento"
              type="date"
            />
            <SexoSelect formik={props} />
            <InputField
              formik={props}
              field="telefono"
              label="Teléfono"
              type="text"
            />
            {isUpdating ? (
              <></>
            ) : (
              <InputField
                formik={props}
                field="correo"
                label="Correo"
                type="email"
              />
            )}
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              py: 2,
            }}
          >
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

export default Persona;
