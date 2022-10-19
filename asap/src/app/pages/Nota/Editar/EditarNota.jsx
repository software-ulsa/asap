import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
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

import NotaService from "../../../services/NotaService";
import ImagenesService from "../../../services/ImagesService";

import InfoBasica from "./InfoBasica";
import ImagenPrincipal from "./ImagenPrincipal";
import ImagenThumbnail from "./ImagenThumbnail";

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

const EditarNota = ({ open, handleClose, notify, nota }) => {
    const [image, setImage] = useState("");
    const [file, setFile] = useState();
  
    const [imageThumb, setImageThumb] = useState("");
    const [fileThumbnail, setFileThumbnail] = useState();
    const [activeStep, setActiveStep] = useState(0);

    const [palabras, setPalabras] = useState([]);

    useEffect(() => {
        if (open) {
          if (nota.foto_principal) {
            ImagenesService.get(nota.foto_principal)
              .then((url) => {
                setImage(url);
              })
              .catch((error) => {
                console.log(error);
              });
            } else {
            setImage();
            }
    
          if (nota.foto_thumbnail) {
            ImagenesService.get(nota.foto_thumbnail)
              .then((url) => {
                setImageThumb(url);
              })
              .catch((error) => {
                console.log(error);
              });
            } else {
            setImageThumb();
            }
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

  const guardarNota = (values) => {
    NotaService.updateNota(values)
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
    titulo: yup.string().required("titulo requerido"),
    tema: yup.string().required("tema requerido"),
    contenido: yup.string().required("contenido requerido"),
  });

  const steps = ["Nota", "Miniatura", "Imagen Principal"];

  const renderSwitch = (props) => {
    const stepsComponent = [
      <InfoBasica formik={props} />,
      <ImagenThumbnail imageThumb={imageThumb} setImageThumb={setImageThumb} setFileThumbnail={setFileThumbnail} />,
      <ImagenPrincipal image={image} setImage={setImage} setFile={setFile} />,
    ];

    return stepsComponent[activeStep];
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Editar nota</DialogTitle>
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
          id: nota?.id || -1,
          titulo: nota?.titulo || "",
          tema: nota?.tema || "",
          contenido: nota?.contenido || "",
          palabras_clave: nota?.palabras_clave || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
            if (palabras.length > 0) {
                if (file) {
                ImagenesService.upload(file)
                    .then((response) => {
                    values.foto_principal = response.data;
                    guardarNota(values);
                    })
                    .catch((error) => console.log(error));
                } 
    
                if (fileThumbnail) {
                ImagenesService.upload(fileThumbnail)
                    .then((response) => {
                    values.foto_thumbnail = response.data;
                    guardarNota(values);
                    })
                    .catch((error) => console.log(error));
                } 
            
                setFile();
                setImage("");
                setFileThumbnail();
                setImageThumb("");
                setSubmitting(false);
                handleClose();
            }
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

export default EditarNota;