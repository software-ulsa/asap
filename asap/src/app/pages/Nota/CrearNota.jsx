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
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";

import { createNota } from "../../services/NotaService";

import InfoBasica from "./Pasos/InfoBasica";
import InputImage from "../../components/Input/InputImage";

import { ColorlibConnector, NotaStepIcon } from "../../utils/custom";
import { notaInitialState } from "../../utils/initialStates";

const CrearNota = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { openCreate, activeStep } = useSelector((state) => state.modal);

  const [nota, setNota] = useState(notaInitialState(null));

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    setNota(notaInitialState(null));
    dispatch(handleClose());
  };

  const saveAction = () => {
    nota.usuario_id = currentUser.id;
    dispatch(createNota(nota));
    dispatch(rebootActiveStep());

    setNota(notaInitialState(null));
    dispatch(handleClose());
  };

  const steps = ["Nota", "Imagen Principal"];
  const stepsComponent = [
    <InfoBasica nota={nota} setNota={setNota} cancelAction={cancelAction} />,
    <InputImage
      item={nota}
      setItem={setNota}
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
      maxWidth="md"
    >
      <DialogTitle>Agregar nota</DialogTitle>
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
                <StepLabel {...labelProps} StepIconComponent={NotaStepIcon}>
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

export default CrearNota;
