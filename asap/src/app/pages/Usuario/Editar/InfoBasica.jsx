import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  
  const InfoBasica = ({ formik }) => {
    return (
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={6}>
          <TextField
            color="info"
            fullWidth
            label="Nombre"
            name="nombre"
            variant="outlined"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            color="info"
            fullWidth
            name="segundo_nombre"
            label="Segundo nombre"
            variant="outlined"
            value={formik.values.segundo_nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            fullWidth
            label="Apellido paterno"
            name="ape_paterno"
            variant="outlined"
            value={formik.values.ape_paterno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ape_paterno && Boolean(formik.errors.ape_paterno)
            }
            helperText={formik.touched.ape_paterno && formik.errors.ape_paterno}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            fullWidth
            label="Apellido materno"
            name="ape_materno"
            variant="outlined"
            value={formik.values.ape_materno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ape_materno && Boolean(formik.errors.ape_materno)
            }
            helperText={formik.touched.ape_materno && formik.errors.ape_materno}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="info"
            fullWidth
            label="Edad"
            name="edad"
            variant="outlined"
            value={formik.values.edad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.edad && Boolean(formik.errors.edad)}
            helperText={formik.touched.edad && formik.errors.edad}
          />
        </Grid>
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
      </Grid>
    );
  };
  
  export default InfoBasica;
  