import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ColorlibConnector, UserStepIcon } from "../../utils/custom";

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

import { getAllRoles } from "../../services/RolService";

import InfoBasica from "./Pasos/InfoBasica";
import Registro from "./Pasos/Registro";
import ImagenPerfil from "./Pasos/ImagenPerfil";

const CrearUsuario = ({ open, handleClose, user, mode }) => {
  const dispatch = useDispatch();
  const { roles, fetched } = useSelector((state) => state.roles);

  const [activeStep, setActiveStep] = useState(0);
  const [usuario, setUsuario] = useState(user);

  useEffect(() => {
    if (!fetched) {
      dispatch(getAllRoles());
    }
  }, [user]);

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

  const steps = ["Persona", "Registro", "Imagen"];
  const stepsComponent = [
    <InfoBasica
      usuario={usuario}
      setUsuario={setUsuario}
      handleNext={handleNext}
      handleClose={handleClose}
    />,
    <Registro
      mode={mode}
      roles={roles}
      usuario={usuario}
      setUsuario={setUsuario}
      setActiveStep={setActiveStep}
      handleBack={handleBack}
      handleNext={handleNext}
      handleClose={handleClose}
    />,
    <ImagenPerfil
      mode={mode}
      usuario={usuario}
      setUsuario={setUsuario}
      handleBack={handleBack}
      handleClose={handleClose}
      setActiveStep={setActiveStep}
    />,
  ];

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
                <StepLabel {...labelProps} StepIconComponent={UserStepIcon}>
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

export default CrearUsuario;
