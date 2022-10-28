import { IconButton, Typography, Avatar, Stack, Divider } from "@mui/material";
import {
  EmailRounded,
  ManageAccounts,
  PhotoCameraRounded,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

const Header = ({ user, image, setImage, setFile }) => {
  const doClickOnInput = () => {
    var input = document.getElementById("subirImagen");
    input?.click();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 2,
        px: 2,
        gap: 2,
      }}
    >
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "right",
          gap: 2,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          {`${user?.nombre} ${user?.ape_paterno}`}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <ManageAccounts />
            <Typography variant="h8">{user?.rol.nombre}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <EmailRounded />
            <Typography variant="h8">{user?.correo}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
