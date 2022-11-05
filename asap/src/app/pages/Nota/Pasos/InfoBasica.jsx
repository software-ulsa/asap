import { useState, useEffect } from "react";
import { Formik } from "formik";

import { Box, Button, Grid, Stack, TextField } from "@mui/material";

import { notaValidationSchema } from "../../../utils/validation";
import { emptyNote } from "../../../utils/initialStates";

import ChipInput from "material-ui-chip-input";
import MUIRichTextEditor from "mui-rte";
import InputArray from "../../../components/InputArray";
import InputField from "../../../components/InputField";

const InfoBasica = ({ mode, nota, setNota, handleNext, handleClose }) => {
  return (
    <Formik
      enableReinitialize={!mode}
      initialValues={{
        titulo: nota?.titulo || "",
        tema: nota?.tema || "",
        contenido: nota?.contenido || "",
        palabras_clave: nota?.palabras_clave || [],
      }}
      validationSchema={notaValidationSchema}
      onSubmit={(values) => {
        setNota((prev) => ({
          ...prev,
          titulo: values.titulo,
          tema: values.tema,
          contenido: values.contenido,
          palabras_clave: values.palabras_clave,
        }));
        handleNext();
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
            <Grid item xs={12}>
              <Box sx={{ marginBottom: 5 }}>
                <MUIRichTextEditor
                  defaultValue={props.values.contenido}
                  inlineToolbar={true}
                  label="Escribe el contenido de la nota aquí"
                  onSave={(data) => {
                    props.setFieldValue("contenido", data);
                  }}
                />
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

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  if (mode) {
                    setNota(emptyNote);
                  }
                  handleClose();
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

export default InfoBasica;
