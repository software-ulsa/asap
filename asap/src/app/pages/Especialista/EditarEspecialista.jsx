import { useState, useEffect } from "react";
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
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";

import { ColorlibConnector, EspecialistaStepIcon } from "../../utils/custom";

import Persona from "../../components/Steps/Persona";
import UsuarioEspecialista from "../../components/Steps/UsuarioEspecialista";

import Domicilio from "./Pasos/Domicilio";
import ImagenPerfil from "./Pasos/ImagenPerfil";

import { especialistaInitialState } from "../../utils/initialStates";

const EditarEspecialista = ({ specialist }) => {
  const dispatch = useDispatch();
  const { activeStep, openEdit } = useSelector((state) => state.modal);
  const [especialista, setEspecialista] = useState();

  useEffect(() => {
    setEspecialista(especialistaInitialState(specialist));
  }, [specialist]);

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Domicilio", "Imagen"];
  const stepsComponent = [
    <Persona
      isUpdating={true}
      item={especialista}
      setItem={setEspecialista}
      cancelAction={cancelAction}
    />,
    <UsuarioEspecialista
      isUpdating={true}
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
      isUpdate={true}
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
      open={openEdit}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
    >
      <DialogTitle>Editar usuario</DialogTitle>
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

export default EditarEspecialista;
