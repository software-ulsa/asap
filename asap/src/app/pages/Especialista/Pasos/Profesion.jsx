import { Box, Button, Grid, Stack, TextField } from "@mui/material";

import { Formik } from "formik";

import { emptyEspecialista } from "../../../utils/initialStates";
import { especialistaContactValidationSchema } from "../../../utils/validation";

const Profesion = ({
  especialista,
  setEspecialista,
  setActiveStep,
  handleBack,
  handleNext,
  handleClose,
}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        especialidad: especialista?.especialidad || "",
        area_especialidad: especialista?.area_especialidad || "",
        cedula: especialista?.cedula || "",
      }}
      validationSchema={especialistaContactValidationSchema}
      onSubmit={(values) => {
        setEspecialista((prev) => ({
          ...prev,
          especialidad: values.especialidad,
          area_especialidad: values.area_especialidad,
          cedula: values.cedula,
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
                label="Especialidad"
                name="especialidad"
                variant="outlined"
                value={props.values.especialidad}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.especialidad &&
                  Boolean(props.errors.especialidad)
                }
                helperText={
                  props.touched.especialidad && props.errors.especialidad
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Área de especialidad"
                name="area_especialidad"
                variant="outlined"
                value={props.values.area_especialidad}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.area_especialidad &&
                  Boolean(props.errors.area_especialidad)
                }
                helperText={
                  props.touched.area_especialidad &&
                  props.errors.area_especialidad
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Cédula"
                name="cedula"
                variant="outlined"
                value={props.values.cedula}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.cedula && Boolean(props.errors.cedula)}
                helperText={props.touched.cedula && props.errors.cedula}
              />
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
                  setEspecialista(emptyEspecialista);
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

export default Profesion;
