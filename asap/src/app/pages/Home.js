import { Box, Typography } from "@mui/material";

import Logo from "../images/asap-banner.png";

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
      {/* <Typography
        variant="h2"
        gutterBottom
        fontFamily="arial"
        fontWeight="light"
        color="#2596be"
      >
        Bienvenid@ a
      </Typography> */}
      <img width={'100%'} height={'113%'} alt="Logo ASAP" src={Logo} />
    </Box>
  );
};

export default Home;
