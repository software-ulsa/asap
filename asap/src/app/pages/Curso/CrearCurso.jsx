import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClose,
  rebootActiveStep,
  setStepSize,
} from "../../reducers/ModalReducer";

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import { cursoInitialState } from "../../utils/initialStates";
import { ColorlibConnector, CursoStepIcon } from "../../utils/custom";

import InfoBasica from "./Pasos/InfoBasica";
import Detalles from "./Pasos/Detalles";
import InputImage from "../../components/Input/InputImage";

import { createCurso } from "../../services/CursoService";

const CrearCurso = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);

  const [curso, setCurso] = useState(cursoInitialState(null));

  const saveAction = () => {
    dispatch(createCurso(curso));
    setCurso(cursoInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    setCurso(cursoInitialState(null));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["General", "Detalles", "Icono"];
  const stepsComponent = [
    <InfoBasica
      curso={curso}
      setCurso={setCurso}
      cancelAction={cancelAction}
    />,
    <Detalles curso={curso} setCurso={setCurso} cancelAction={cancelAction} />,
    <InputImage
      item={curso}
      setItem={setCurso}
      saveAction={saveAction}
      cancelAction={cancelAction}
      variant="rounded"
      width="450px"
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
      fullWidth
    >
      <DialogTitle>Crear curso</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={() => dispatch(handleClose())}>
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
                <StepLabel {...labelProps} StepIconComponent={CursoStepIcon}>
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

export default CrearCurso;
