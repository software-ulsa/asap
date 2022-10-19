import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Registro = ({ formik, roles }) => {
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
          label="Contaseña"
          name="password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="lblRoles" color="info">
            Rol
          </InputLabel>
          <Select
            labelId="slRoles"
            color="info"
            id="lblRoles"
            name="id_rol"
            value={formik.values.id_rol}
            label="Rol"
            onChange={formik.handleChange}
          >
            <MenuItem disabled value={0}>
              Elegir uno
            </MenuItem>
            {roles?.map((rol) => {
              return <MenuItem value={rol.id}>{rol.nombre}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Registro;
