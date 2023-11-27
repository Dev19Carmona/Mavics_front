import React from "react";
import { Flex, Spinner, Center } from "@chakra-ui/react";

export const LoaderGeneral = ({isLoading, body = <div className="custom-loader"></div>}) => {
    if (!isLoading) {
        return null;
      }
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      backgroundColor="transparent"
      zIndex="9999"
      justifyContent="center"
      alignItems="center"
    >
      <Center>
        {body}
      </Center>
    </Flex>
  );
};
