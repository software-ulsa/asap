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

import { ColorlibConnector, PacienteStepIcon } from "../../utils/custom";

import Persona from "../../components/Steps/Persona";
import UsuarioPaciente from "../../components/Steps/UsuarioPaciente";

import ImagenPerfil from "./Pasos/ImagenPerfil";

import { pacienteInitialState } from "../../utils/initialStates";

const EditarPaciente = ({ pacient }) => {
  const dispatch = useDispatch();
  const { activeStep, openEdit } = useSelector((state) => state.modal);
  const [paciente, setPaciente] = useState();

  useEffect(() => {
    setPaciente(pacienteInitialState(pacient));
  }, [pacient]);

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Imagen"];
  const stepsComponent = [
    <Persona
      isUpdating={true}
      item={paciente}
      setItem={setPaciente}
      cancelAction={cancelAction}
    />,
    <UsuarioPaciente
      isUpdating={true}
      item={paciente}
      setItem={setPaciente}
      cancelAction={cancelAction}
    />,
    <ImagenPerfil
      isUpdate={true}
      paciente={paciente}
      setPaciente={setPaciente}
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

export default EditarPaciente;
