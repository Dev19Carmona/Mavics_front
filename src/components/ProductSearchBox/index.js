import { Box, Flex } from "@chakra-ui/react";

export const ProductSearchBox = ({ body1, body2 }) => {
  return (
    <Flex flexDir={'column'} gap={'5px'} width={"35%"}>
      <Box>{body1}</Box>
      <Flex>{body2}</Flex>
    </Flex>
  );
};
