import { Grid, TextField } from "@mui/material";
import ChipInput from "material-ui-chip-input";
import { useState } from "react";

const InfoBasica = ({ formik, palabras, setPalabras }) => {
  const handleAddChip = (chip) => {
    setPalabras((oldArray) => [...oldArray, chip]);
  };

  const handleDeleteChip = (chip, index) => {
    setPalabras(palabras.filter((item, i) => i !== index));
  };

  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Titulo"
          name="titulo"
          variant="outlined"
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.titulo && Boolean(formik.errors.titulo)}
          helperText={formik.touched.titulo && formik.errors.titulo}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          name="tema"
          label="Tema"
          variant="outlined"
          value={formik.values.tema}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tema && Boolean(formik.errors.tema)}
          helperText={formik.touched.tema && formik.errors.tema}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Contenido"
          name="contenido"
          variant="outlined"
          value={formik.values.contenido}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contenido && Boolean(formik.errors.contenido)}
          helperText={formik.touched.contenido && formik.errors.contenido}
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
  );
};

export default InfoBasica;
