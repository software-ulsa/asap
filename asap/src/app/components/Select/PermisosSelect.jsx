import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Grid,
} from "@mui/material";

const PermisosSelect = ({ formik }) => {
  const sections = [
    "USUARIOS",
    "ESPECIALISTAS",
    "PACIENTES",
    "NOTAS",
    "PUBLICIDADES",
    "CURSOS",
    "ROLES",
    "CATEGORIAS",
    "CARRERAS",
    "ESPECIALIDADES",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      "permisos",
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="permisosSel">Permisos</InputLabel>
        <Select
          multiple
          labelId="permisosSel"
          value={formik.values.permisos}
          onChange={handleChange}
          input={<OutlinedInput label="Permisos" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {sections.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default PermisosSelect;
