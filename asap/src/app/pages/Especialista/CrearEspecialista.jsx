import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClose,
  rebootActiveStep,
  setStepSize,
} from "../../reducers/ModalReducer";

import {
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import { especialistaInitialState } from "../../utils/initialStates";
import { ColorlibConnector, EspecialistaStepIcon } from "../../utils/custom";

import Persona from "../../components/Steps/Persona";
import UsuarioEspecialista from "../../components/Steps/UsuarioEspecialista";

import Domicilio from "./Pasos/Domicilio";
import ImagenPerfil from "./Pasos/ImagenPerfil";

const CrearEspecialista = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);
  const [especialista, setEspecialista] = useState(
    especialistaInitialState(null)
  );

  const cancelAction = () => {
    setEspecialista(especialistaInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Domicilio", "Imagen"];
  const stepsComponent = [
    <Persona
      item={especialista}
      setItem={setEspecialista}
      cancelAction={cancelAction}
    />,
    <UsuarioEspecialista
      item={especialista}
      setItem={setEspecialista}
      cancelAction={cancelAction}
    />,
    <Domicilio
      especialista={especialista}
      setEspecialista={setEspecialista}
      cancelAction={cancelAction}
    />,
    <ImagenPerfil
      especialista={especialista}
      setEspecialista={setEspecialista}
      cancelAction={cancelAction}
    />,
  ];

  useEffect(() => {
    dispatch(setStepSize(steps.length));
  }, []);

  return (
    <Dialog
      open={openCreate}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
    >
      <DialogTitle>Agregar especialista</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={cancelAction}>
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
