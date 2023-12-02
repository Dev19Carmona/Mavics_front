import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Flex, GridItem } from "@chakra-ui/react";

export const GridItemGeneral = ({body}) => {
  const { colorMode } = useColorModeGeneral();
  return (
    <GridItem>
      <Flex
        gap={2}
        flexDir={"column"}
        p={4}
        boxShadow="md"
        borderRadius={9}
      ></Flex>
      {body}
    </GridItem>
  );
};
