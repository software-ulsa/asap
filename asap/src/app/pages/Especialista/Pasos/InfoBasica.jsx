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

import { emptyEspecialista } from "../../../utils/initialStates";
import { especialistaBasicInfoValidationSchema } from "../../../utils/validation";

const InfoBasica = ({
  especialista,
  setEspecialista,
  handleNext,
  handleClose,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: especialista?.id || -1,
        nombre: especialista?.nombre || "",
        segundo_nombre: especialista?.segundo_nombre || "",
        ape_paterno: especialista?.ape_paterno || "",
        ape_materno: especialista?.ape_materno || "",
        edad: especialista?.edad || 0,
        sexo: especialista?.sexo || "Elegir uno",
      }}
      validationSchema={especialistaBasicInfoValidationSchema}
      onSubmit={(values) => {
        setEspecialista((prev) => ({
          ...prev,
          nombre: values.nombre,
          segundo_nombre: values.segundo_nombre,
          ape_paterno: values.ape_paterno,
          ape_materno: values.ape_materno,
          edad: values.edad,
          sexo: values.sexo,
        }));
        handleNext();
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={6}>
              <TextField
                color="info"
                fullWidth
                label="Nombre"
                name="nombre"
                variant="outlined"
                value={props.values.nombre}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.nombre && Boolean(props.errors.nombre)}
                helperText={props.touched.nombre && props.errors.nombre}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                color="info"
                fullWidth
                name="segundo_nombre"
                label="Segundo nombre"
                variant="outlined"
                value={props.values.segundo_nombre}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Apellido paterno"
                name="ape_paterno"
                variant="outlined"
                value={props.values.ape_paterno}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.ape_paterno && Boolean(props.errors.ape_paterno)
                }
                helperText={
                  props.touched.ape_paterno && props.errors.ape_paterno
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Apellido materno"
                name="ape_materno"
                variant="outlined"
                value={props.values.ape_materno}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.ape_materno && Boolean(props.errors.ape_materno)
                }
                helperText={
                  props.touched.ape_materno && props.errors.ape_materno
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Edad"
                name="edad"
                variant="outlined"
                value={props.values.edad}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.edad && Boolean(props.errors.edad)}
                helperText={props.touched.edad && props.errors.edad}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel
                  color={
                    props.touched.sexo && Boolean(props.errors.sexo)
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
                  value={props.values.sexo}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={props.touched.sexo && Boolean(props.errors.sexo)}
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              py: 2,
            }}
          >
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
                  setEspecialista(emptyEspecialista);
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

export default InfoBasica;
