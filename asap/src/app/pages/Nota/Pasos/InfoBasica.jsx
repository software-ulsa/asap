import { useDispatch } from "react-redux";
import { handleNext } from "../../../reducers/ModalReducer";

import { Formik } from "formik";

import { Box, Button, Grid, Stack } from "@mui/material";

import { notaValidationSchema } from "../../../utils/validation";

import InputArray from "../../../components/Input/InputArray";
import InputField from "../../../components/Input/InputField";
import EstadoNotaSelect from "../../../components/Select/EstadoNotaSelect";
import TextEditor from "../../../components/TextEditor";

const InfoBasica = ({ nota, setNota, cancelAction }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        titulo: nota.titulo,
        tema: nota.tema,
        estado: nota.estado,
        contenido: nota.contenido,
        palabras_clave: nota.palabras_clave,
      }}
      validationSchema={notaValidationSchema}
      onSubmit={(values) => {
        setNota((prev) => ({
          ...prev,
          titulo: values.titulo,
          tema: values.tema,
          contenido: values.contenido,
          estado: values.estado,
          palabras_clave: values.palabras_clave,
        }));

        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField formik={props} label="Tema" field="tema" type="text" />
            <InputField
              formik={props}
              label="Titulo"
              field="titulo"
              type="text"
            />
            <InputArray
              formik={props}
              field="palabras_clave"
              label="Palabras clave"
            />
            <EstadoNotaSelect formik={props} label="Estado" field="estado" />
            <Grid item xs={12}>
              <Box sx={{ marginBottom: 5 }}>
                <TextEditor formik={props} nota={nota} />
              </Box>
            </Grid>
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

export default InfoBasica;
