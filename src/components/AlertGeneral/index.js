import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";

export const AlertGeneral = ({
  description = "Por su seguridad, el token de sesion a expirado, haz click en aceptar para volver a iniciar sesion.",
  onClick = () => {}
}) => {
  
  return (
    <Flex
      direction={'column'}
      alignItems={"center"}
      gap={10}
      border={"1px solid teal"}
      p={5}
      borderRadius={9}
    >
      <Text fontSize={20}>{description}</Text>
      <ButtonSubmitGeneral onClick={onClick} title={"Aceptar"} />
    </Flex>
  );
};
