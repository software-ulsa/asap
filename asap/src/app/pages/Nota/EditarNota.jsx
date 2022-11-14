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

import { updateNota } from "../../services/NotaService";
import ImagenesService from "../../services/ImagesService";

import InfoBasica from "./Pasos/InfoBasica";
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import { ColorlibConnector, NotaStepIcon } from "../../utils/custom";
import { notaInitialState } from "../../utils/initialStates";

const EditarNota = ({ note }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { openEdit, activeStep } = useSelector((state) => state.modal);

  const [nota, setNota] = useState();
  const [mainImage, setMainImage] = useState("");
  const [mainFile, setMainFile] = useState();

  useEffect(() => {
    setNota(notaInitialState(note));
  }, [note]);

  const cancelAction = () => {
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const guardarNota = () => {
    if (mainFile) {
      ImagenesService.upload(mainFile)
        .then((response) => {
          nota.imagen = response.data;
        })
        .catch((error) => console.log(error));
    }

    nota.usuario_id = currentUser.id;
    dispatch(updateNota(nota));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Nota", "Imagen Principal"];
  const stepsComponent = [
    <InfoBasica nota={nota} setNota={setNota} cancelAction={cancelAction} />,
    <ImagenPrincipal
      mainImage={mainImage}
      setMainImage={setMainImage}
      setMainFile={setMainFile}
      saveNota={guardarNota}
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
      <DialogTitle>Editar nota</DialogTitle>
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
export default EditarNota;
