import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const TipoCategoriaSelect = ({ formik }) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel
          color={
            formik.touched.tipo && Boolean(formik.errors.tipo)
              ? "error"
              : "info"
          }
          required
          id="lblTipo"
        >
          Tipo de categoria
        </InputLabel>
        <Select
          required
          labelId="lblTipo"
          name="tipo"
          color="info"
          value={formik.values.tipo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tipo && Boolean(formik.errors.tipo)}
          label="Tipo de categoria"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          <MenuItem value="Nota">Nota</MenuItem>
          <MenuItem value="Curso">Curso</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default TipoCategoriaSelect;
