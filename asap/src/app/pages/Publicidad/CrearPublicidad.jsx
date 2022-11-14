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
import { createPublicidad } from "../../services/PublicidadService";

const CrearPublicidad = () => {
  const dispatch = useDispatch();
  const { activeStep, openCreate } = useSelector((state) => state.modal);

  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [publicidad, setPublicidad] = useState(publicidadInitialState(null));

  const guardarPublicidad = () => {
    if (file) {
      ImagesService.upload(file)
        .then((response) => {
          publicidad.imagen = response.data;
        })
        .catch((error) => console.log(error));
    }

    dispatch(createPublicidad(publicidad));
    setPublicidad(publicidadInitialState(null));
    setFile();
    setImage("");
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    setPublicidad(publicidadInitialState(null));
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
      open={openCreate}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Crear publicidad</DialogTitle>
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

export default CrearPublicidad;
