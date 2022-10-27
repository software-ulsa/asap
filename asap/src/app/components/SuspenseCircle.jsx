import { Box, CircularProgress } from "@mui/material";
import React from "react";

const SuspenseCircle = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default SuspenseCircle;
