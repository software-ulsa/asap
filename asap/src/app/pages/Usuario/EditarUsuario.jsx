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

import { ColorlibConnector, UsuarioStepIcon } from "../../utils/custom";
import { usuarioInitialState } from "../../utils/initialStates";

import Persona from "../../components/Steps/Persona";
import Usuario from "../../components/Steps/Usuario";
import InputImage from "../../components/Input/InputImage";

import { updateUser } from "../../services/UsuarioService";
import ImagenesService from "../../services/ImagesService";

const EditarUsuario = ({ user }) => {
  const dispatch = useDispatch();
  const prevImage = user?.imagen || "";
  const { activeStep, openEdit } = useSelector((state) => state.modal);
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    setUsuario(usuarioInitialState(user));
  }, [user]);

  const saveAction = () => {
    dispatch(updateUser(usuario));
    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const cancelAction = () => {
    if (usuario.imagen !== prevImage) {
      ImagenesService.delete(usuario.imagen).catch((error) =>
        console.log(error)
      );
      setUsuario((prev) => ({
        ...prev,
        imagen: prevImage,
      }));
    }

    dispatch(rebootActiveStep());
    dispatch(handleClose());
  };

  const steps = ["Persona", "Usuario", "Imagen"];
  const stepsComponent = [
    <Persona
      isUpdating={true}
      item={usuario}
      setItem={setUsuario}
      cancelAction={cancelAction}
    />,
    <Usuario
      isUpdating={true}
      item={usuario}
      setItem={setUsuario}
      cancelAction={cancelAction}
    />,
    <InputImage
      item={usuario}
      setItem={setUsuario}
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
                <StepLabel {...labelProps} StepIconComponent={UsuarioStepIcon}>
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

export default EditarUsuario;
