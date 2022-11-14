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
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import { updateCurso } from "../../services/CursoService";
import ImagesService from "../../services/ImagesService";

const EditarCurso = ({ course }) => {
  const dispatch = useDispatch();
  const { activeStep, openEdit } = useSelector((state) => state.modal);

  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [curso, setCurso] = useState();

  useEffect(() => {
    setCurso(cursoInitialState(course));
  }, [course]);

  const guardarCurso = () => {
    if (file) {
      ImagesService.upload(file)
        .then((response) => {
          curso.imagen = response.data;
        })
        .catch((error) => console.log(error));
    }

    dispatch(updateCurso(curso));
    setFile();
    setImage("");
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
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
    <ImagenPrincipal
      image={image}
      setImage={setImage}
      setFile={setFile}
      guardarCurso={guardarCurso}
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
      fullWidth
    >
      <DialogTitle>Editar curso</DialogTitle>
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

export default EditarCurso;
