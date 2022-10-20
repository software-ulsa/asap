import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

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
import Registro from "./Registro";
import ImagenPerfil from "./ImagenPerfil";
import { phoneRegExp } from "../../../utils/utils";
import RolService from "../../../services/RolService";

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

const CrearUsuario = ({ open, handleClose, notify }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [roles, setRoles] = useState();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (open) {
      RolService.getAllRoles()
        .then((response) => {
          setRoles(response);
        })
        .catch((error) => console.log(error));
    }
  }, [open]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const guardarUsuario = (values) => {
    UsuarioService.createUser(values)
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
    matricula: yup
      .string()
      .max(9, "Matricula no válida")
      .required("Matricula requerida"),
    password: yup.string().required("Contraseña requerida"),
    telefono: yup
      .string()
      .matches(phoneRegExp, "Teléfono no váildo")
      .required("Teléfono requerido"),
    correo: yup.string().email("Correo no válido").required("Correo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      segundo_nombre: "",
      ape_paterno: "",
      ape_materno: "",
      edad: 0,
      sexo: "Elegir uno",
      foto_usuario: "",
      matricula: "",
      password: "",
      telefono: "",
      id_rol: 0,
      correo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (file) {
        ImagenesService.upload(file)
          .then((response) => {
            values.foto_usuario = response.data;
            guardarUsuario(values);
          })
          .catch((error) => console.log(error));
      } else {
        guardarUsuario(values);
      }
      setFile();
      setImage("");
      resetForm();
      setActiveStep(0);
      setSubmitting(false);
      handleClose();
    },
  });

  const steps = ["Persona", "Registro", "Imagen"];
  const stepsComponent = [
    <InfoBasica formik={formik} />,
    <Registro formik={formik} roles={roles} />,
    <ImagenPerfil image={image} setImage={setImage} setFile={setFile} />,
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
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
          {stepsComponent[activeStep]}
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
                hidden={activeStep < steps.length - 1}
                color="secondary"
                type="submit"
              >
                Agregar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                hidden={activeStep === steps.length - 1}
                onClick={handleNext}
              >
                Siguiente
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CrearUsuario;
