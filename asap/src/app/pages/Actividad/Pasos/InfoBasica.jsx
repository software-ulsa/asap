import { useDispatch } from "react-redux";
import { handleNext } from "../../../reducers/ModalReducer";

import { Formik } from "formik";

import { Box, Button, Grid, Stack } from "@mui/material";

import { actividadValidationSchema } from "../../../utils/validation";

import InputField from "../../../components/Input/InputField";
import TextEditorWithFormik from "../../../components/TextEditorWithFormik";

import { useState } from "react";

const InfoBasica = ({ actividad, setActividad, cancelAction }) => {
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(true);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        titulo: actividad.titulo,
        descripcion: actividad.descripcion,
      }}
      validationSchema={actividadValidationSchema}
      onSubmit={(values) => {
        setActividad((prev) => ({
          ...prev,
          titulo: values.titulo,
          descripcion: values.descripcion,
        }));

        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              field="titulo"
              label="Titulo"
              type="text"
            />
            <TextEditorWithFormik
              formik={props}
              actividad={actividad}
              campo="descripcion"
              setEmpty={setEmpty}
            />
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
                disabled={!props.isValid || empty}
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

export default InfoBasica;
