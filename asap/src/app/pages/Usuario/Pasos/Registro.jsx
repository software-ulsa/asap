import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";

import { emptyUser } from "../../../utils/initialStates";
import { registerUserValidationSchema } from "../../../utils/validation";

const Registro = ({
  mode,
  roles,
  usuario,
  setUsuario,
  setActiveStep,
  handleBack,
  handleNext,
  handleClose,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        correo: usuario?.correo || "",
        password: usuario?.password || "",
        telefono: usuario?.telefono || "",
        matricula: usuario?.matricula || "",
        id_rol: usuario?.id_rol || 0,
      }}
      validationSchema={registerUserValidationSchema(mode)}
      onSubmit={(values) => {
        setUsuario((prev) => ({
          ...prev,
          correo: values.correo,
          matricula: values.matricula,
          password: values.password,
          telefono: values.telefono,
          id_rol: values.id_rol,
        }));
        handleNext();
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Matricula"
                name="matricula"
                type="text"
                variant="outlined"
                value={props.values.matricula}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.matricula && Boolean(props.errors.matricula)
                }
                helperText={props.touched.matricula && props.errors.matricula}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Teléfono móvil"
                name="telefono"
                variant="outlined"
                value={props.values.telefono}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.telefono && Boolean(props.errors.telefono)}
                helperText={props.touched.telefono && props.errors.telefono}
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
                value={props.values.correo}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.correo && Boolean(props.errors.correo)}
                helperText={props.touched.correo && props.errors.correo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label={mode ? "Contraseña" : "Nueva contraseña"}
                name="password"
                type="password"
                variant="outlined"
                value={props.values.password}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.password && Boolean(props.errors.password)}
                helperText={props.touched.password && props.errors.password}
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
                  value={props.values.id_rol}
                  label="Rol"
                  onChange={props.handleChange}
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              py: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!props.isValid}
              >
                Siguiente
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setUsuario(emptyUser);
                  setActiveStep(0);
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Registro;
