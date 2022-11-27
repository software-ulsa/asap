import { useDispatch } from "react-redux";
import { handleBack } from "../../../reducers/ModalReducer";

import { Formik } from "formik";

import { Button, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";

import Media from "./Media";

import { isValidHttpUrl } from "../../../utils/utils";

const ContenidoMultimedia = ({
  actividad,
  setActividad,
  saveAction,
  cancelAction,
}) => {
  const dispatch = useDispatch();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        url_media: actividad.url_media,
        youtube_url: actividad.youtube_url,
        doc_url: actividad.doc_url,
      }}
      onSubmit={(values) => {
        if (values.url_media === "") {
          if (values.youtube_url !== "" && isValidHttpUrl(values.youtube_url)) {
            values.url_media = values.youtube_url;
          } else if (values.doc_url !== "" && isValidHttpUrl(values.doc_url)) {
            values.url_media = values.doc_url;
          }
        }

        setActividad((prev) => ({
          ...prev,
          url_media: values.url_media,
        }));
        saveAction();
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box
            sx={{
              width: "800px",
              py: 2,
            }}
          >
            <Grid container rowGap={2}>
              <Media formik={props} />
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                pt: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(handleBack())}
                sx={{ mr: 1 }}
              >
                Anterior
              </Button>
              <Stack direction="row" spacing={2}>
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
                  onClick={cancelAction}
                >
                  Cancelar
                </Button>
              </Stack>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ContenidoMultimedia;
