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
import InputImage from "../../components/Input/InputImage";

import { ColorlibConnector, NotaStepIcon } from "../../utils/custom";
import { notaInitialState } from "../../utils/initialStates";
import TextEditor from "../../components/TextEditor";
const EditarNota = ({ note }) => {
  const dispatch = useDispatch();
  const prevImage = note?.imagen || "";
  const { currentUser } = useSelector((state) => state.auth);
  const { openEdit, activeStep } = useSelector((state) => state.modal);

  const [nota, setNota] = useState();

  useEffect(() => {
    setNota(notaInitialState(note));
  }, [note]);

  const saveAction = () => {
    nota.usuario_id = currentUser.id;
    dispatch(updateNota(nota));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    if (nota.imagen !== prevImage) {
      ImagenesService.delete(nota.imagen).catch((error) => console.log(error));
      setNota((prev) => ({
        ...prev,
        imagen: prevImage,
      }));
    }
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Nota", "Contenido", "Imagen Principal"];
  const stepsComponent = [
    <InfoBasica nota={nota} setNota={setNota} cancelAction={cancelAction} />,
    <TextEditor
      item={nota}
      setItem={setNota}
      campo="contenido"
      cancelAction={cancelAction}
    />,
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
