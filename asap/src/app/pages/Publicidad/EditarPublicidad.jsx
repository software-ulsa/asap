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

import { publicidadInitialState } from "../../utils/initialStates";
import { ColorlibConnector, PublicidadStepIcon } from "../../utils/custom";

import InfoBasica from "./Pasos/InfoBasica";
import Detalles from "./Pasos/Detalles";
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import ImagesService from "../../services/ImagesService";
import { updatePublicidad } from "../../services/PublicidadService";

const EditarPublicidad = ({ publicity }) => {
  const dispatch = useDispatch();
  const { activeStep, openEdit } = useSelector((state) => state.modal);

  const [publicidad, setPublicidad] = useState();
  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    setPublicidad(publicidadInitialState(publicity));
  }, [publicity]);

  const guardarPublicidad = () => {
    if (file) {
      ImagesService.upload(file)
        .then((response) => {
          publicidad.imagen = response.data;
        })
        .catch((error) => console.log(error));
    }

    dispatch(updatePublicidad(publicidad));
    setFile();
    setImage("");
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["General", "Empresa", "Imagen"];
  const stepsComponent = [
    <InfoBasica
      publicidad={publicidad}
      setPublicidad={setPublicidad}
      cancelAction={cancelAction}
    />,
    <Detalles
      publicidad={publicidad}
      setPublicidad={setPublicidad}
      cancelAction={cancelAction}
    />,
    <ImagenPrincipal
      image={image}
      setImage={setImage}
      setFile={setFile}
      guardarPublicidad={guardarPublicidad}
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
      <DialogTitle>Editar publicidad</DialogTitle>
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
                  StepIconComponent={PublicidadStepIcon}
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

export default EditarPublicidad;
