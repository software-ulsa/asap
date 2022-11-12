import { Box, Typography } from "@mui/material";

import Logo from "../images/logo.png";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        fontFamily="cursive"
        fontWeight="light"
        color="#2596be"
      >
        Bienvenido a
      </Typography>
      <img alt="Logo ASAP" src={Logo} />
    </Box>
  );
};

export default Home;
