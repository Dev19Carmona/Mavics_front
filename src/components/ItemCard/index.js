import { Flex, Text } from "@chakra-ui/react";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";

export const ItemCard = ({ props = { title: "Title" } }) => {
    const { title } = props;
  const { colorMode } = useColorModeGeneral();
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      cursor={"pointer"}
      userSelect={"none"}
      borderRadius={"2px"}
      bg={colorMode === "light" ? "box.light" : "box.dark"}
      color={colorMode !== "dark" ? "black" : "white"}
      pl={"19px"}
      pr={"19px"}
      pt={"2px"}
      pb={"2px"}
      //_hover={{ fontSize: "15px" }}
    >
      <Text> {title}</Text>
    </Flex>
  );
};
