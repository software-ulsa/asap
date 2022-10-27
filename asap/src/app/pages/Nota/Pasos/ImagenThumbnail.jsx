import { Avatar, Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import { emptyNote } from "../../../utils/initialStates";

const ImagenThumbnail = ({
  thumbnailImage,
  setThumbnailImage,
  setThumbnailFile,
  setActiveStep,
  setNota,
  handleBack,
  handleNext,
  handleClose,
}) => {
  const doClickOnThumbnail = () => {
    var inputThumbnail = document.getElementById("subirThumbnail");
    inputThumbnail?.click();
  };

  return (
    <>
      <Grid container spacing={2} marginTop={2} px={10}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input
              type="file"
              accept="image/*"
              id="subirThumbnail"
              onChange={(e) => {
                const fileThumbnail = e.target.files[0];
                if (fileThumbnail) {
                  setThumbnailImage(URL.createObjectURL(fileThumbnail));
                  setThumbnailFile(fileThumbnail);
                }
              }}
              hidden
            ></input>
            <IconButton
              onClick={doClickOnThumbnail}
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
                src={thumbnailImage}
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
          <Button variant="contained" color="secondary" onClick={handleNext}>
            Siguiente
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

export default ImagenThumbnail;
