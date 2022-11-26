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
import { pacienteInitialState } from "../../utils/initialStates";

import Persona from "../../components/Steps/Persona";
import UsuarioPaciente from "../../components/Steps/UsuarioPaciente";
import InputImage from "../../components/Input/InputImage";

import { updatePaciente } from "../../services/PacienteService";
import ImagenesService from "../../services/ImagesService";

const EditarPaciente = ({ pacient }) => {
  const dispatch = useDispatch();
  const prevImage = pacient?.imagen || "";
  const { activeStep, openEdit } = useSelector((state) => state.modal);
  const [paciente, setPaciente] = useState();

  useEffect(() => {
    setPaciente(pacienteInitialState(pacient));
  }, [pacient]);

  const saveAction = () => {
    dispatch(updatePaciente(paciente));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    if (paciente.imagen !== prevImage) {
      ImagenesService.delete(paciente.imagen).catch((error) =>
        console.log(error)
      );
      paciente((prev) => ({
        ...prev,
        imagen: prevImage,
      }));
    }

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
