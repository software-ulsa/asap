import { Grid, TextField } from "@mui/material";

const Registro = ({ formik, rol }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Matricula"
          name="matricula"
          variant="outlined"
          value={formik.values.matricula}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.matricula && Boolean(formik.errors.matricula)}
          helperText={formik.touched.matricula && formik.errors.matricula}
        />
      </Grid>
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
          InputProps={{ readOnly: true }}
          color="info"
          fullWidth
          label="Correo"
          name="correo"
          type="email"
          variant="outlined"
          value={formik.values.correo}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Nueva contraseña"
          name="password"
          type="password"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          InputProps={{ readOnly: true }}
          color="info"
          fullWidth
          label="Rol"
          name="rol"
          variant="outlined"
          value={rol}
        />
      </Grid>
    </Grid>
  );
};

export default Registro;
