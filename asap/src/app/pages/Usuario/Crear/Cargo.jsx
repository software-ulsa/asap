import { Grid, TextField } from "@mui/material";

const Cargo = ({ formik }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      <Grid item xs={12}>
        <TextField
          color="info"
          fullWidth
          label="Rol"
          name="rol"
          variant="outlined"
          value={formik.values.id_rol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.id_rol && Boolean(formik.errors.id_rol)
          }
          helperText={formik.touched.id_rol && formik.errors.id_rol}
        />
      </Grid>
    </Grid>
  );
};

export default Cargo;
