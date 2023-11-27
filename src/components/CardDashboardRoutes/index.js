import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";

export const CardDashboardRoutes = ({
  props = {
    name: "PRODUCTOS",
    count: 40,
    icon: <FaShoppingBag fontSize={50} />,
    click:()=>{}
  },
}) => {
  const { name, count, icon, click } = props;
  const { colorMode } = useColorModeGeneral();
  return (
    <Flex
    onClick={()=>{click()}}
      cursor={"pointer"}
      bg={colorMode === "light" ? "box.light" : "box.dark"}
      borderRadius={9}
      h={"full"}
      w={"full"}
      boxShadow={"3px 2px 1px 0px rgba(128, 118, 108, 0.18)"}
      justifyContent={"space-between"}
      alignItems={"start"}
      //border={"1px solid"}
      p={2}
      gap={5}
    >
      <Flex
        w={"full"}
        h={"full"}
        //borderRight={"1px solid"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {icon}
      </Flex>
      <Flex
        flexDir={"column"}
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        //border={'1px solid'}
      >
        <Text fontSize={30}>{name}</Text>
        <Text>Cantidad: {count}</Text>
      </Flex>
    </Flex>
  );
};
