import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Flex } from "@chakra-ui/react";

export const BoxPresentation = ({ body, justify = 'center' }) => {
  const { colorMode } = useColorModeGeneral();
  return (
    <Flex
      bg={colorMode === "dark" ? "box.dark" : "box.light"}
      justifyContent={justify}
      alignItems={justify}
      // bg="red"
      h={"full"}
      gap={2}
      flexDir={"column"}
      p={4}
      boxShadow="md"
      borderRadius={9}
    >
      {body}
    </Flex>
  );
};
