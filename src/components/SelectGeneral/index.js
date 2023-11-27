import { Collapse, Fade, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { ItemsList } from "../ItemsList";

export const SelectGeneral = ({
  handleSubmit,
  items,
  titleSelect,
  reference,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode } = useColorModeGeneral();
  return (
    <Flex justifyContent={"center"} flexDir={"column"}>
      <Flex
        borderRadius={8}
        justifyContent={"space-between"}
        width={"full"}
        p={2}
        pl={"50%"}
        cursor={"pointer"}
        bg={colorMode === "light" ? "box.light" : "box.dark"}
        alignItems={"center"}
        onClick={onToggle}
        gap={5}
      >
        <Text fontSize="xs" letterSpacing={1} opacity={0.5}>
          {titleSelect}
        </Text>
        {isOpen ? (
          <AiFillUpCircle opacity={0.7} />
        ) : (
          <AiFillDownCircle opacity={0.7} />
        )}
      </Flex>
      <Flex position={"relative"}>
        <Collapse in={isOpen} animateOpacity>
          <Flex
            bg={"gray.700"}
            borderBottomLeftRadius={9}
            borderBottomRightRadius={9}
            position="absolute"
            left={"5%"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"93%"}
            p={2}
          >
            <ItemsList
              onClick={handleSubmit}
              items={items}
              reference={reference}
            />
          </Flex>
        </Collapse>
      </Flex>
    </Flex>
  );
};
