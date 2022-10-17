import { Grid, TextField } from "@mui/material";

const Profesion = ({ formik }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Especialidad"
          name="especialidad"
          variant="outlined"
          value={formik.values.especialidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.especialidad && Boolean(formik.errors.especialidad)
          }
          helperText={formik.touched.especialidad && formik.errors.especialidad}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Área de especialidad"
          name="area_especialidad"
          variant="outlined"
          value={formik.values.area_especialidad}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.area_especialidad &&
            Boolean(formik.errors.area_especialidad)
          }
          helperText={
            formik.touched.area_especialidad && formik.errors.area_especialidad
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Cédula"
          name="cedula"
          variant="outlined"
          value={formik.values.cedula}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cedula && Boolean(formik.errors.cedula)}
          helperText={formik.touched.cedula && formik.errors.cedula}
        />
      </Grid>
    </Grid>
  );
};

export default Profesion;
