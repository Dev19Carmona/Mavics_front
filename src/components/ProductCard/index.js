import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { BiRectangle } from "react-icons/bi";
import { IMAGE_TEST_PRODUCT } from "../../../config/_constants";
import { cutString } from "../../../config/_functions";

export const ProductCard = ({
  data = {
    isIcon: false,
    icon: <BiRectangle />,
    src: IMAGE_TEST_PRODUCT,
    name: "Hamburger",
    price: "200,00",
    product:{},
    body: "body",
  },
  onClickProductPresentation = () => {},
}) => {
  const { colorMode } = useColorModeGeneral();
  const { src, isIcon, icon, name, price, body, product } = data;
  const sizesPicture = 120
  return (
    <Flex
      boxShadow={"md"}
      w={"1fr"}
      justify={"center"}
      fontSize={"20"}
      direction={"column"}
      p={1}
      bg={colorMode === "dark" ? "box.dark" : "box.light"}
      rounded={"15px"}
      
    >
      <Flex
        width={sizesPicture}
        height={sizesPicture}
        alignSelf={"center"}
        rounded={"full"}
        overflow={"hidden"}
        m={2}
        cursor={"pointer"}
        boxShadow={'xl'}
        onClick={()=>{onClickProductPresentation(product)}}
      >
        {isIcon ? (
          <Box fontSize={`${sizesPicture}px`}>{icon}</Box>
        ) : (
          <Image
          rounded={"full"}
          src={src}
          alt="img"
          width={sizesPicture}
          height={sizesPicture}
          style={{ objectFit: "contain" }}
        />
        )}
      </Flex>
      {!isIcon && (
        <Flex direction={"column"}>
          <Flex
            cursor={"default"}
            justify={"space-between"}
            mx={2}
            alignItems={"center"}
          >
            <Box alignSelf={"center"}>
              <Text fontSize={"15pt"} fontWeight={"thin"}>
                <Tooltip label={name}>
                  <Text fontSize={"sm"}>{cutString(name)}</Text>
                </Tooltip>
              </Text>
            </Box>
            <Box
              alignSelf={"center"}
              bg={colorMode === "dark" ? "black" : "box.dark"}
              color={"white"}
              rounded={"full"}
              p={2}
              fontSize={"12pt"}
            >
              <Text fontSize={"sm"}>{price}</Text>
            </Box>
          </Flex>
          <Box ml={"2"} fontSize={"12px"} my={3}>
            {body}
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
