import { Box, Button, Grid, Stack, TextField } from "@mui/material";

import { Formik } from "formik";

import { emptyEspecialista } from "../../../utils/initialStates";
import { especialistaContactValidationSchema } from "../../../utils/validation";

const Contacto = ({
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
        correo: especialista?.correo || "",
        telefono: especialista?.telefono || "",
        telefono_casa: especialista?.telefono_casa || "",
      }}
      validationSchema={especialistaContactValidationSchema}
      onSubmit={(values) => {
        setEspecialista((prev) => ({
          ...prev,
          correo: values.correo,
          telefono: values.matricula,
          telefono_casa: values.telefono_casa,
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
                label="Teléfono de casa"
                name="telefono_casa"
                variant="outlined"
                value={props.values.telefono_casa}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
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

export default Contacto;
