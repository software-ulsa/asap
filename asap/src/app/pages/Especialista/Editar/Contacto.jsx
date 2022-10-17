import { Grid, TextField } from "@mui/material";

const Contacto = ({ formik }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Teléfono móvil"
          name="telefono"
          variant="outlined"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={formik.touched.telefono && formik.errors.telefono}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Teléfono de casa"
          name="telefono_casa"
          variant="outlined"
          value={formik.values.telefono_casa}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Correo"
          name="correo"
          type="email"
          variant="outlined"
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.correo && Boolean(formik.errors.correo)}
          helperText={formik.touched.correo && formik.errors.correo}
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Contacto;
