import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleClose, setStepSize } from "../../reducers/ModalReducer";

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

import { emptyCurso } from "../../utils/initialStates";
import { ColorlibConnector, CursoStepIcon } from "../../utils/custom";

import InfoBasica from "./Pasos/InfoBasica";
import Detalles from "./Pasos/Detalles";
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import { createCurso } from "../../services/CursoService";
import ImagesService from "../../services/ImagesService";

const CrearCurso = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);

  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [curso, setCurso] = useState(emptyCurso);

  const guardarCurso = () => {
    console.log(curso);
    dispatch(handleClose());
    if (file) {
      ImagesService.upload(file)
        .then((response) => {
          curso.icono = response.data;
        })
        .catch((error) => console.log(error));
    }

    dispatch(createCurso(curso));
  };

  const steps = ["General", "Detalles", "Icono"];
  const stepsComponent = [
    <InfoBasica curso={curso} setCurso={setCurso} />,
    <Detalles curso={curso} setCurso={setCurso} />,
    <ImagenPrincipal
      image={image}
      setImage={setImage}
      setFile={setFile}
      guardarCurso={guardarCurso}
    />,
  ];

  useEffect(() => {
    dispatch(setStepSize(steps.length));
  }, []);

  return (
    <Dialog open={openCreate} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear curso</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton onClick={() => dispatch(handleClose(steps.length))}>
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
