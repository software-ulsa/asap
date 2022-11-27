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

import { ColorlibConnector, ActividadStepIcon } from "../../utils/custom";
import { actividadInitialState } from "../../utils/initialStates";

import InfoBasica from "./Pasos/InfoBasica";
import ContenidoMultimedia from "./Pasos/ContenidoMultimedia";

import { updateActividad } from "../../services/ActividadService";

const EditarActividad = ({ activity, cursoId }) => {
  const dispatch = useDispatch();
  const { openEdit, activeStep } = useSelector((state) => state.modal);

  const [actividad, setActividad] = useState();

  useEffect(() => {
    setActividad(actividadInitialState(activity, cursoId));
  }, [activity]);

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const saveAction = () => {
    dispatch(updateActividad(actividad));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["General", "Multimedia"];
  const stepsComponent = [
    <InfoBasica
      actividad={actividad}
      setActividad={setActividad}
      cancelAction={cancelAction}
    />,
    <ContenidoMultimedia
      actividad={actividad}
      setActividad={setActividad}
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
      maxWidth="md"
    >
      <DialogTitle>Editar actividad</DialogTitle>
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
                <StepLabel
                  {...labelProps}
                  StepIconComponent={ActividadStepIcon}
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

export default EditarActividad;
