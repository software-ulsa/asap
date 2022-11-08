import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const EstadoNotaSelect = ({ formik }) => {
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel
          color={
            formik.touched.estado && Boolean(formik.errors.estado)
              ? "error"
              : "info"
          }
          id="lblEstado"
        >
          Estado
        </InputLabel>
        <Select
          labelId="lblEstado"
          name="estado"
          color="info"
          value={formik.values.estado}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.estado && Boolean(formik.errors.estado)}
          label="Estado"
        >
          <MenuItem disabled value="Elegir uno">
            Elegir uno
          </MenuItem>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="Rechazado">Rechazado</MenuItem>
          <MenuItem value="Aceptado">Aceptado</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default EstadoNotaSelect;
