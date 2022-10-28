import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";

import { createNota } from "../../services/NotaService";
import ImagenesService from "../../services/ImagesService";

import InfoBasica from "./Pasos/InfoBasica";
import ImagenThumbnail from "./Pasos/ImagenThumbnail";
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import { ColorlibConnector, NotaStepIcon } from "../../utils/custom";
import { emptyNote } from "../../utils/initialStates";

const CrearNota = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [nota, setNota] = useState(emptyNote);
  const [mainImage, setMainImage] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");

  const [palabras, setPalabras] = useState([]);
  const [contenido, setContenido] = useState("");

  const [mainFile, setMainFile] = useState();
  const [thumbnailFile, setThumbnailFile] = useState();

  const [activeStep, setActiveStep] = useState(0);

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

  const guardarNota = () => {
    if (thumbnailFile) {
      ImagenesService.upload(thumbnailFile)
        .then((response) => {
          nota.foto_thumbnail = response.data;
        })
        .catch((error) => console.log(error));
    }

    if (mainFile) {
      ImagenesService.upload(mainFile)
        .then((response) => {
          nota.foto_principal = response.data;
        })
        .catch((error) => console.log(error));
    }

    dispatch(createNota(nota));
    setNota(emptyNote);
    handleClose();
  };

  const steps = ["Nota", "Miniatura", "Imagen Principal"];
  const stepsComponent = [
    <InfoBasica
      mode={false}
      nota={nota}
      setNota={setNota}
      handleNext={handleNext}
      handleClose={handleClose}
      palabras={palabras}
      setPalabras={setPalabras}
      contenido={contenido}
      setContenido={setContenido}
    />,

    <ImagenThumbnail
      thumbnailImage={thumbnailImage}
      setThumbnailImage={setThumbnailImage}
      setThumbnailFile={setThumbnailFile}
      setActiveStep={setActiveStep}
      setNota={setNota}
      handleBack={handleBack}
      handleNext={handleNext}
      handleClose={handleClose}
    />,

    <ImagenPrincipal
      mainImage={mainImage}
      setMainImage={setMainImage}
      setMainFile={setMainFile}
      setActiveStep={setActiveStep}
      setNota={setNota}
      handleBack={handleBack}
      handleClose={handleClose}
      saveNota={guardarNota}
    />,
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
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
                <StepLabel {...labelProps} StepIconComponent={NotaStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {stepsComponent[activeStep]}
      </DialogContent>
    </Dialog>
  );
};

export default CrearNota;
