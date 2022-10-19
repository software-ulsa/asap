import React, { useState } from "react";
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
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import NotaService from "../../../services/NotaService";
import ImagenesService from "../../../services/ImagesService";

import InfoBasica from "./InfoBasica";
import ImagenThumbnail from "./ImagenThumbnail";
import ImagenPrincipal from "./ImagenPrincipal";

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
    1: <AssignmentRoundedIcon />,
    2: <ContactPageRounded />,
    3: <ImageRounded />,
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

const CrearNota = ({ open, handleClose, notify }) => {
  
    const [image, setImage] = useState("");
    const [file, setFile] = useState();
  
    const [imageThumb, setImageThumb] = useState("");
    const [fileThumbnail, setFileThumbnail] = useState();
    const [activeStep, setActiveStep] = useState(0);

    const [palabras, setPalabras] = useState([]);

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

  const guardarNota = (values) => {
    NotaService.createNota(values)
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
    titulo: yup.string().required("Título requerido"),
    tema: yup.string().required("Tema requerido"),
    contenido: yup.string().required("Contenido requerido"),
  });

  const formik = useFormik({
    initialValues: {
        titulo: "",
        tema: "",
        contenido: "",
        foto_principal: "",
        foto_thumbnail: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
        if (palabras.length > 0) {
          if (file) {
            await ImagenesService.upload(file)
              .then((response) => {
                values.foto_principal = response.data;
              })
              .catch((error) => console.log(error));
          }
  
          if (fileThumbnail) {
            await ImagenesService.upload(fileThumbnail)
              .then((response) => {
                values.foto_thumbnail = response.data;
              })
              .catch((error) => console.log(error));
          }
  
          values.palabras_clave = palabras;
  
          guardarNota(values);
          setFile();
          setImage("");
  
          setFileThumbnail();
          setImageThumb("");
          setPalabras([]);
  
          resetForm();
          setSubmitting(false);
          handleClose();
        }
      },
    });

  const steps = ["Nota", "Miniatura", "Imagen Principal"];
  const stepsComponent = [
    <InfoBasica formik={formik} />,
    <ImagenThumbnail imageThumb={imageThumb} setImageThumb={setImageThumb} setFileThumbnail={setFileThumbnail} />,
    <ImagenPrincipal image={image} setImage={setImage} setFile={setFile} />,
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Agregar nota</DialogTitle>
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
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Anterior
            </Button>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                type={activeStep === steps.length ? "submit" : "button"}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Agregar" : "Siguiente"}
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

export default CrearNota;