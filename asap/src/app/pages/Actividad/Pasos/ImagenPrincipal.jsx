import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { PhotoCameraRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const ImagenPrincipal = ({ mainImage, setMainImage, setMainFile }) => {
  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
    <>
      <Grid container>
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
                  height: "280px",
                  width: "420px",
                }}
                src={mainImage}
                variant="rounded"
              >
                <PhotoCameraRounded />
              </Avatar>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImagenPrincipal;
