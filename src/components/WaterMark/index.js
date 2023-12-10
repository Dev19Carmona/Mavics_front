import React from "react";
import { Box, Text, Container, keyframes, Image } from "@chakra-ui/react";
import { appName, fonts } from "../../../config/_disappointed";
import { motion } from 'framer-motion';

export const WaterMark = () => {
  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;
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
    fontFamily: fonts.appName.a
  };

  const additionalTextStyles = {
    animation: "shake 3s infinite",  // Agrega tu nueva animación aquí
  };
  const appNameArray = appName.split(' ')
  return (
    <Box style={boxStyles}>
      <Text>
        <span style={{ ...textStyles, animationDelay: "1s" }}>{appNameArray[0]} </span>
        <span style={{ ...textStyles, ...additionalTextStyles }}>{appNameArray[1]}</span>
        
      </Text>
    </Box>
      
  );
};
