import { useColorModeValue } from "@chakra-ui/react";

export const useColorModeGeneral = () => {
  const colorMode = useColorModeValue('light', 'dark')
  return{
    colorMode
  }
}