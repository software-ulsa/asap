import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const SexoSelect = ({ formik }) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel
          color={
            formik.touched.sexo && Boolean(formik.errors.sexo)
              ? "error"
              : "info"
          }
          id="lblSexo"
        >
          Sexo
        </InputLabel>
        <Select
          labelId="lblSexo"
          name="sexo"
          color="info"
          value={formik.values.sexo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sexo && Boolean(formik.errors.sexo)}
          label="Sexo"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Femenino">Femenino</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SexoSelect;
