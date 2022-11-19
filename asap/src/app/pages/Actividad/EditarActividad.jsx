import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../reducers/ModalReducer";

import * as yup from "yup";
import { useFormik } from "formik";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { Close } from "@mui/icons-material";

import InputField from "../../components/Input/InputField";

import { updateActividad } from "../../services/ActividadService";
import ImagenesService from "../../services/ImagesService";

import Media from "./Pasos/Media";
import { isValidHttpUrl } from "../../utils/utils";

const EditarActividad = ({ actividad, cursoId }) => {
  const dispatch = useDispatch();
  const { openEdit } = useSelector((state) => state.modal);
  const [mainImage, setMainImage] = useState("");
  const [mainFile, setMainFile] = useState();

  const validationSchema = yup.object({
    titulo: yup.string().required("Titulo requerido"),
    descripcion: yup.string().required("Descripción requerida"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: actividad?.id || -1,
      titulo: actividad?.titulo || "",
      descripcion: actividad?.descripcion || "",
      youtube_url: actividad?.url_media.includes("youtube")
        ? actividad?.url_media
        : "",
      doc_url: !actividad?.url_media.includes("youtube")
        ? actividad?.url_media
        : "",
      curso_id: actividad?.curso_id || cursoId,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (mainFile) {
        ImagenesService.upload(mainFile)
          .then((response) => {
            values.url_media = response.data;
          })
          .catch((error) => console.log(error));
      } else if (
        values.youtube_url !== "" &&
        isValidHttpUrl(values.youtube_url)
      ) {
        values.url_media = values.youtube_url;
      } else if (values.doc_url !== "" && isValidHttpUrl(values.doc_url)) {
        values.url_media = values.doc_url;
      } else {
        values.url_media = "";
      }

      dispatch(updateActividad(values));
      dispatch(handleClose());
    },
  });

  return (
    <Dialog
      open={openEdit}
      onClose={() => dispatch(handleClose())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Editar actividad</DialogTitle>
      <Box
        position="absolute"
        top={0}
        right={0}
        paddingTop={1}
        paddingRight={1}
      >
        <IconButton
          onClick={() => {
            dispatch(handleClose());
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container rowGap={2}>
            <InputField
              formik={formik}
              field="titulo"
              label="Titulo"
              type="text"
            />
            <InputField
              formik={formik}
              multiline={true}
              minRows={3}
              field="descripcion"
              label="Descripcion"
              type="text"
            />
            <Media
              formik={formik}
              mainImage={mainImage}
              setMainImage={setMainImage}
              setMainFile={setMainFile}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box paddingBottom={2} paddingRight={2}>
            <Button
              style={{ marginRight: 10 }}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Guardar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(handleClose());
              }}
            >
              Cancelar
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditarActividad;
