import { Avatar, Box, Grid, IconButton, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";

const ImagenThumbnail = ({ imageThumb, setImageThumb, setFileThumbnail }) => {
    const doClickOnThumbnail = () => {
        var inputThumbnail = document.getElementById("subirThumbnail");
        inputThumbnail?.click();
    };

  return (
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
                  setImageThumb(URL.createObjectURL(fileThumbnail));
                  setFileThumbnail(fileThumbnail);
                }
            }}
            hidden
          ></input>
          <IconButton onClick={doClickOnThumbnail}>
            <Avatar
              sx={{
                bgcolor: grey[900],
                height: "300px",
                width: "300px",
              }}
              src={imageThumb}
            >
              <PhotoCameraRounded />
            </Avatar>
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ImagenThumbnail;