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
import { especialistaInitialState } from "../../utils/initialStates";

import Persona from "../../components/Steps/Persona";
import UsuarioEspecialista from "../../components/Steps/UsuarioEspecialista";

import Domicilio from "./Pasos/Domicilio";
import InputImage from "../../components/Input/InputImage";

import { updateEspecialista } from "../../services/EspecialistaService";
import ImagenesService from "../../services/ImagesService";

const EditarEspecialista = ({ specialist }) => {
  const dispatch = useDispatch();
  const prevImage = specialist?.imagen || "";
  const { activeStep, openEdit } = useSelector((state) => state.modal);
  const [especialista, setEspecialista] = useState();

  useEffect(() => {
    setEspecialista(especialistaInitialState(specialist));
  }, [specialist]);

  const saveAction = () => {
    dispatch(updateEspecialista(especialista));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    if (especialista.imagen !== prevImage) {
      ImagenesService.delete(especialista.imagen).catch((error) =>
        console.log(error)
      );
      setEspecialista((prev) => ({
        ...prev,
        imagen: prevImage,
      }));
    }
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
    <InputImage
      item={especialista}
      setItem={setEspecialista}
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
