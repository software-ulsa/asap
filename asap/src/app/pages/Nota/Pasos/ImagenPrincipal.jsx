import { Avatar, Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import { emptyNote } from "../../../utils/initialStates";

const ImagenPrincipal = ({
  mainImage,
  setMainImage,
  setMainFile,
  setActiveStep,
  setNota,
  handleBack,

  handleClose,
  saveNota,
}) => {
  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} px={10}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="file"
              accept="image/*"
              id="subirImagen"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setMainImage(URL.createObjectURL(file));
                  setMainFile(file);
                }
              }}
              hidden
            ></input>
            <IconButton
              onClick={doClickOnInput}
              disableFocusRipple
              disableTouchRipple
              disableRipple
            >
              <Avatar
                sx={{
                  bgcolor: grey[900],
                  height: "300px",
                  width: "300px",
                }}
                src={mainImage}
              >
                <PhotoCameraRounded />
              </Avatar>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          py: 2,
          px: 2,
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Anterior
        </Button>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary" onClick={saveNota}>
            Guardar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setNota(emptyNote);
              setActiveStep(0);
              handleClose();
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ImagenPrincipal;
