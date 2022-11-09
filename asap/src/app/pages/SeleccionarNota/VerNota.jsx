import React from "react";
import { Formik } from "formik";

import { Grid, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

import ImagenesService from "../../services/ImagesService";

//import { cursoValidationSchema } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { createNota, updateNota } from "../../services/NotaService";

const InfoCurso = ({ curso, file, cancelAction, mode }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: curso?.id || -1,
        titulo: curso?.titulo || "",
        descripcion: curso?.descripcion || "",
        icono: curso?.icono || "",
      }}
      //validationSchema={cursoValidationSchema}
      onSubmit={(values) => {
        if (file) {
          ImagenesService.upload(file)
            .then((response) => {
              values.icono = response.data;
            })
            .catch((error) => console.log(error));
        }

        // if (mode) {
        //   dispatch(createCurso(values));
        // } else {
        //   dispatch(updateCurso(values));
        // }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                label="Título"
                name="titulo"
                variant="outlined"
                value={props.values.titulo}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={props.touched.titulo && Boolean(props.errors.titulo)}
                helperText={props.touched.titulo && props.errors.titulo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="info"
                fullWidth
                multiline
                maxRows={3}
                name="descripcion"
                label="Descripcion"
                variant="outlined"
                value={props.values.descripcion}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.descripcion && Boolean(props.errors.descripcion)
                }
                helperText={
                  props.touched.descripcion && props.errors.descripcion
                }
              />
            </Grid>
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
              Guardar
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

export default InfoCurso;
