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

import { usuarioInitialState } from "../../utils/initialStates";
import { ColorlibConnector, UsuarioStepIcon } from "../../utils/custom";

import Persona from "../../components/Steps/Persona";
import Usuario from "../../components/Steps/Usuario";

import ImagenPerfil from "./Pasos/ImagenPerfil";

const CrearUsuario = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);
  const [usuario, setUsuario] = useState(usuarioInitialState(null));

  const cancelAction = () => {
    setUsuario(usuarioInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Imagen"];
  const stepsComponent = [
    <Persona item={usuario} setItem={setUsuario} cancelAction={cancelAction} />,
    <Usuario item={usuario} setItem={setUsuario} cancelAction={cancelAction} />,
    <ImagenPerfil
      usuario={usuario}
      setUsuario={setUsuario}
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
      <DialogTitle>Agregar usuario</DialogTitle>
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
                <StepLabel {...labelProps} StepIconComponent={UsuarioStepIcon}>
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
