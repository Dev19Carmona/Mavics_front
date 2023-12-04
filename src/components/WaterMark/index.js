import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const WaterMark = () => {
  const boxStyles = {
    position: "absolute",
    fontSize: 50,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.05,
    fontFamily: "Roboto, sans-serif",
  };

  const textStyles = {
    position: "relative",
    opacity: 1,  // Cambiado a 1 para que la opacidad nunca cambie
    animation: "shake 2s forwards",  // Tu animación original
  };

  const additionalTextStyles = {
    animation: "shake 3s infinite",  // Agrega tu nueva animación aquí
  };

  return (
    <Box style={boxStyles}>
      <Text>
        <span style={{ ...textStyles, animationDelay: "1s" }}>Mavics </span>
        <span style={{ ...textStyles, ...additionalTextStyles }}>Collection</span>
      </Text>
    </Box>
  );
};
