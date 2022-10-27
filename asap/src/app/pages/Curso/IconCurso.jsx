import React from "react";
import { IconButton, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { PhotoCameraRounded } from "@mui/icons-material";

const IconCurso = ({ image, setImage, setFile }) => {
  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
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
          sx={{
            bgcolor: grey[900],
            height: "150px",
            width: "150px",
          }}
          src={image}
        >
          <PhotoCameraRounded />
        </Avatar>
      </IconButton>
    </Box>
  );
};

export default IconCurso;
