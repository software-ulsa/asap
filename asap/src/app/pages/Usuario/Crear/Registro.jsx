import { Grid, TextField } from "@mui/material";

const Registro = ({ formik }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Matricula"
          name="matricula"
          type="text"
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
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Contraseña"
          name="password"
          variant="outlined"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Registro;
