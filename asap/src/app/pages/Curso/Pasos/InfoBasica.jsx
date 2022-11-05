import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleClose, handleNext } from "../../../reducers/ModalReducer";

import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";

import InputField from "../../../components/InputField";

import { cursoBasicInfoValidationSchema } from "../../../utils/validation";

const InfoBasica = ({ curso, setCurso }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: curso?.id || -1,
        titulo: curso?.titulo || "",
        descripcion: curso?.descripcion || "",
        objetivo: curso?.objetivo || "",
        duracion: curso?.duracion || 0,
      }}
      validationSchema={cursoBasicInfoValidationSchema}
      onSubmit={(values) => {
        setCurso((prev) => ({
          ...prev,
          titulo: values.titulo,
          descripcion: values.descripcion,
          objetivo: values.objetivo,
          duracion: values.duracion,
        }));
        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              label="Titulo"
              field="titulo"
              type="text"
            />
            <InputField
              formik={props}
              label="Descripcion"
              field="descripcion"
              type="text"
            />
            <InputField
              formik={props}
              label="Objetivo"
              field="objetivo"
              type="text"
            />
            <InputField
              formik={props}
              label="Duracion en horas"
              field="duracion"
              type="number"
            />
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              py: 2,
            }}
            gap={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!props.isValid}
            >
              Siguiente
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
        </form>
      )}
    </Formik>
  );
};

export default InfoBasica;
