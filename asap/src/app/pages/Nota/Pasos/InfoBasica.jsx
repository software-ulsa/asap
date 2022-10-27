import { useState, useEffect } from "react";
import { Formik } from "formik";

import { Box, Button, Grid, Stack, TextField } from "@mui/material";

import { notaValidationSchema } from "../../../utils/validation";
import { emptyNote } from "../../../utils/initialStates";

import ChipInput from "material-ui-chip-input";
import MUIRichTextEditor from "mui-rte";

const InfoBasica = ({ nota, setNota, handleClose }) => {
  const [palabras, setPalabras] = useState([]);
  const [contenido, setContenido] = useState("");
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(palabras.length !== 0 && contenido !== "");
  }, [palabras, contenido]);

  const handleAddChip = (chip) => {
    setPalabras((oldArray) => [...oldArray, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    setPalabras(palabras.filter((item, i) => i !== index));
  };

  return (
    <Formik
      initialValues={nota}
      validationSchema={notaValidationSchema}
      onSubmit={(values) => {
        setNota((prev) => ({
          ...prev,
          titulo: values.titulo,
          tema: values.tema,
          contenido: contenido,
          palabras_clave: palabras,
        }));
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Titulo"
                name="titulo"
                variant="outlined"
                value={props.values.titulo}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.titulo && Boolean(props.errors.titulo)}
                helperText={props.touched.titulo && props.errors.titulo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                name="tema"
                label="Tema"
                variant="outlined"
                value={props.values.tema}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.tema && Boolean(props.errors.tema)}
                helperText={props.touched.tema && props.errors.tema}
              />
            </Grid>
            <Grid item xs={12}>
              <MUIRichTextEditor
                label="Escribe el contenido de la nota aquí"
                inlineToolbar={true}
                onSave={(data) => setContenido(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <ChipInput
                color="info"
                fullWidth
                label="Palabras clave"
                name="palabras_clave"
                variant="outlined"
                placeholder="Escribe y presiona enter para agregar"
                value={palabras}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />
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
                disabled={!(props.isValid && isComplete)}
              >
                Siguiente
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setNota(emptyNote);
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
