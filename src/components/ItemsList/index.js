import { Box, Flex, Grid } from "@chakra-ui/react";
import { ItemCard } from "../ItemCard";

export const ItemsList = ({ items = [], onClick = () => {}, reference = "key" }) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)" // Dos columnas
      gap={1} // Espacio entre las cajas
      justifyContent="center"
    >
      {items.map((item, i) => (
        <Box
          key={i}
          onClick={() => {
            onClick({key:reference,value:item});
          }}
        >
          <ItemCard
            props={{
              title: item.name,
            }}
          />
        </Box>
      ))}
    </Grid>
  );
};
