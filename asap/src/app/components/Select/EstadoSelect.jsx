import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const EstadoSelect = ({ formik }) => {
  const estados = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Estado de México",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ];
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
          required
        >
          Estado
        </InputLabel>
        <Select
          required
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
          {estados.map((estado) => {
            return <MenuItem value={estado}>{estado}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default EstadoSelect;
