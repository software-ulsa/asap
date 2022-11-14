import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { handleNext } from "../../../reducers/ModalReducer";

import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";

import InputField from "../../../components/Input/InputField";

import { publicidadInfoValidationSchema } from "../../../utils/validation";
import InputSwitch from "../../../components/Input/InputSwitch";

const InfoBasica = ({ publicidad, setPublicidad, cancelAction }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        nombre: publicidad.nombre,
        descripcion: publicidad.descripcion,
        fecha_inicio: publicidad.fecha_inicio,
        fecha_fin: publicidad.fecha_fin,
        activo: publicidad.activo,
      }}
      validationSchema={publicidadInfoValidationSchema}
      onSubmit={(values) => {
        setPublicidad((prev) => ({
          ...prev,
          nombre: values.nombre,
          descripcion: values.descripcion,
          fecha_inicio: values.fecha_inicio,
          fecha_fin: values.fecha_fin,
          activo: values.activo,
        }));
        dispatch(handleNext());
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2} marginTop={2}>
            <InputField
              formik={props}
              label="Nombre"
              field="nombre"
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
              label="Fecha de inicio"
              field="fecha_inicio"
              type="date"
            />
            <InputField
              formik={props}
              label="Fecha de fin"
              field="fecha_fin"
              type="date"
            />
            <InputSwitch formik={props} label="Activo" field="activo" />
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
            <Button variant="contained" color="error" onClick={cancelAction}>
              Cancelar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default InfoBasica;
