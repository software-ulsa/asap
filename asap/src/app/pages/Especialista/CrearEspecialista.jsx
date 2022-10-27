import React, { useState } from "react";

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

import { emptyEspecialista } from "../../utils/initialStates";
import { ColorlibConnector, EspecialistaStepIcon } from "../../utils/custom";

import InfoBasica from "./Pasos/InfoBasica";
import Contacto from "./Pasos/Contacto";
import Profesion from "./Pasos/Profesion";
import ImagenPerfil from "./Pasos/ImagenPerfil";

const CrearEspecialista = ({ open, handleClose }) => {
  const [especialista, setEspecialista] = useState(emptyEspecialista);
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

  const steps = ["Persona", "Contacto", "Profesión", "Imagen"];

  const stepsComponent = [
    <InfoBasica
      especialista={especialista}
      setEspecialista={setEspecialista}
      handleNext={handleNext}
      handleClose={handleClose}
    />,
    <Contacto
      especialista={especialista}
      setEspecialista={setEspecialista}
      setActiveStep={setActiveStep}
      handleBack={handleBack}
      handleNext={handleNext}
      handleClose={handleClose}
    />,
    <Profesion
      especialista={especialista}
      setEspecialista={setEspecialista}
      setActiveStep={setActiveStep}
      handleBack={handleBack}
      handleNext={handleNext}
      handleClose={handleClose}
    />,
    <ImagenPerfil
      mode={true}
      especialista={especialista}
      setEspecialista={setEspecialista}
      setActiveStep={setActiveStep}
      handleBack={handleBack}
      handleClose={handleClose}
    />,
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Agregar especialista</DialogTitle>
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
                  StepIconComponent={EspecialistaStepIcon}
                >
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

export default CrearEspecialista;
