import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, useFormik } from "formik";

import {
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import {
  Close,
  ContactPageRounded,
  ImageRounded,
  LocalHospitalRounded,
  PersonRounded,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import UsuarioService from "../../../services/UsuarioService";
import ImagenesService from "../../../services/ImagesService";

import InfoBasica from "./InfoBasica";
import Cargo from "./Cargo";
import ImagenPerfil from "./ImagenPerfil";
import Registro from "./Registro";

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#00ace6",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#0d803e",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#93a2b8",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  backgroundColor: ownerState.active
    ? "#00ace6"
    : ownerState.completed
    ? "#0d803e"
    : "#93a2b8",
  alignItems: "center",
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonRounded />,
    2: <ContactPageRounded />,
    3: <LocalHospitalRounded />,
    4: <ImageRounded />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const EditarUsuario = ({ open, handleClose, notify, usuario }) => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (open) {
      if (usuario.foto_especialista) {
        ImagenesService.get(usuario.foto_especialista)
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setImage();
      }
    } else {
      setActiveStep(0);
    }
  }, [open]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const guardarUsuario = (values) => {
    UsuarioService.updateUser(values)
      .then((response) => {
        if (response.message) {
          notify("success", response.message);
        } else {
          notify("error", response.error);
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  const validationSchema = yup.object({
    nombre: yup.string().required("Nombre requerido"),
    ape_paterno: yup.string().required("Apellido paterno requerido"),
    ape_materno: yup.string().required("Apellido materno requerido"),
    edad: yup
      .number("La edad debe ser un número")
      .positive("La edad debe ser mayor a 0")
      .integer("La edad debe ser un número")
      .max(120, "Edad no válida")
      .required("Edad requerida"),
    sexo: yup
      .string()
      .oneOf(["Masculino", "Femenino"])
      .label("Elegir uno")
      .required("Sexo requerido"),
    especialidad: yup.string().required("Especialidad requerida"),
    matricula: yup
      .string()
      .min(9, "Cédula no válida")
      .max(9, "Cédula no válida")
      .required("Cédula requerida"),
    password: yup.string().required("Contraseña Requerida"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Teléfono no váildo")
      .required("Teléfono requerido"),
    correo: yup.string().email("Correo no válido").required("Correo requerido"),
  });

  const steps = ["Persona", "Registro", "Cargo", "Imagen"];

  const renderSwitch = (props) => {
    const stepsComponent = [
      <InfoBasica formik={props} />,
      <Registro formik={props} />,
      <Cargo formik={props} />,
      <ImagenPerfil image={image} setImage={setImage} setFile={setFile} />,
    ];

    return stepsComponent[activeStep];
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Agregar usuario</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Formik
        initialValues={{
          id: usuario?.id || -1,
          nombre: usuario?.nombre || "",
          segundo_nombre: usuario?.segundo_nombre || "",
          ape_paterno: usuario?.ape_paterno || "",
          ape_materno: usuario?.ape_materno || "",
          correo: usuario?.correo || "",
          password: usuario?.password || "",
          telefono: usuario?.telefono || "",
          edad: usuario?.edad || "",
          matricula: usuario?.matricula || "",
          sexo: usuario?.sexo || "",
          id_rol: usuario?.id_rol || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (file) {
            ImagenesService.upload(file)
              .then((response) => {
                values.foto_especialista = response.data;
                guardarUsuario(values);
              })
              .catch((error) => console.log(error));
          } else {
            guardarUsuario(values);
          }
          setFile();
          setImage("");
          setSubmitting(false);
          setActiveStep(0);
          handleClose();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <DialogContent>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<ColorlibConnector />}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel
                        {...labelProps}
                        StepIconComponent={ColorlibStepIcon}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {renderSwitch(props)}
            </DialogContent>
            <DialogActions>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pb: 2,
                  px: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="info"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Anterior
                </Button>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type={activeStep === steps.length ? "submit" : "button"}
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditarUsuario;