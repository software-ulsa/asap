import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";

const ImagenPrincipal = ({ image, setImage, setFile }) => {
  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
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
                setImage(URL.createObjectURL(file));
                setFile(file);
              }
            }}
            hidden
          ></input>
          <IconButton onClick={doClickOnInput}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: grey[900],
                height: "480px",
                width: "640px",
              }}
              src={image}
            >
              <PhotoCameraRounded />
            </Avatar>
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImagenPrincipal;
