import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import { Button, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";

import ImagenesService from "../../services/ImagesService";

import Actividades from "../Actividad/Actividades";
import CrearActividad from "../Actividad/CrearActividad";
import ImagenPrincipal from "./Pasos/ImagenPrincipal";

import { useDispatch, useSelector } from "react-redux";
import { getCursoById } from "../../services/CursoService";
import InfoBasica from "./Pasos/InfoBasica";

const EditarCurso = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { curso, actividades, fetched } = useSelector(
    (state) => state.actividades
  );

  const [image, setImage] = useState("");
  const [file, setFile] = useState();

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const obtenerImagen = (key) => {
    ImagenesService.get(key)
      .then((url) => {
        setImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(getCursoById(state.id));
    }
  }, [fetched, dispatch]);

  useEffect(() => {
    if (curso?.icono !== "") {
      obtenerImagen(curso.icono);
    }
  }, [curso]);

  return (
    <>
      <Helmet>
        <title>{`${curso?.titulo}`} - ASAP</title>
        <meta name="Cursos" content="Cursos registrados" />
      </Helmet>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4" marginBottom={3}>
          Informaci&oacute;n general
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={2}
      >
        <ImagenPrincipal image={image} setImage={setImage} setFile={setFile} />
        <InfoBasica
          file={file}
          curso={curso}
          mode={false}
          cancelAction={navigate("/cursos")}
        />
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          py: 3,
        }}
        gap={2}
      >
        <Typography variant="h4" gutterBottom>
          Contenido del curso
        </Typography>
        <Button variant="contained" color="info" onClick={handleOpenCreate}>
          Agregar actividad
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          py: 3,
        }}
        gap={2}
      >
        <Actividades actividades={actividades} fetched={fetched} />
      </Box>

      <CrearActividad
        handleClose={handleCloseCreate}
        open={openCreate}
        curso={curso}
      />
    </>
  );
};

export default EditarCurso;
