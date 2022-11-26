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

import { pacienteInitialState } from "../../utils/initialStates";
import { ColorlibConnector, PacienteStepIcon } from "../../utils/custom";

import Persona from "../../components/Steps/Persona";
import UsuarioPaciente from "../../components/Steps/UsuarioPaciente";
import InputImage from "../../components/Input/InputImage";

import { createPaciente } from "../../services/PacienteService";

const CrearPaciente = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);
  const [paciente, setPaciente] = useState(pacienteInitialState(null));

  const saveAction = () => {
    dispatch(createPaciente(paciente));
    setPaciente(pacienteInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    setPaciente(pacienteInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Imagen"];
  const stepsComponent = [
    <Persona
      item={paciente}
      setItem={setPaciente}
      cancelAction={cancelAction}
    />,
    <UsuarioPaciente
      item={paciente}
      setItem={setPaciente}
      cancelAction={cancelAction}
    />,
    <InputImage
      item={paciente}
      setItem={setPaciente}
      saveAction={saveAction}
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
      <DialogTitle>Agregar paciente</DialogTitle>
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
                <StepLabel {...labelProps} StepIconComponent={PacienteStepIcon}>
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

export default CrearPaciente;
