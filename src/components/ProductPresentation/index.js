import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { BoxPresentation } from "../BoxPresentation";

export const ProductPresentation = ({ props }) => {
  const { productPresentation } = props;
  const { colorMode } = useColorModeGeneral();
  return (
    <Grid
      gap={4}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(3, 1fr)"
      letterSpacing={2}
      p={20}
    >
      <GridItem rowSpan={3}>
        <BoxPresentation
          body={
            <Image
              rounded={"full"}
              src={productPresentation?.urlImage}
              alt="img"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
          }
        />
      </GridItem>

      <GridItem>
        <BoxPresentation
          body={<Text fontWeight={"bold"}>{productPresentation?.name}</Text>}
        />
      </GridItem>

      <GridItem>
        <BoxPresentation
          body={<Text>{productPresentation?.amount} unidades</Text>}
        />
      </GridItem>

      <GridItem>
        <BoxPresentation
          body={
            <Text>
              $ {Math.floor(productPresentation?.price).toLocaleString()}
            </Text>
          }
        />
      </GridItem>
    </Grid>
  );
};
