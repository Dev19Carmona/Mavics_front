import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { BoxPresentation } from "../BoxPresentation";
import { TableGeneral } from "../TableGeneral";

export const ProductPresentation = ({ props }) => {
  const { productPresentation } = props;
  const { sizes } = productPresentation;
  const { colorMode } = useColorModeGeneral();
  const indexSizes = ["Talla", "Cantidad"];
  const valuesSizeTable = ["name", "amount"]
  return (
    <Grid
      gap={3}
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
          body={<Text>{productPresentation?.description}</Text>}
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
      <GridItem colSpan={2}>
        <BoxPresentation
          justify={null}
          body={<TableGeneral index={indexSizes} data={sizes} values={valuesSizeTable}/>}
        />
      </GridItem>
    </Grid>
  );
};
