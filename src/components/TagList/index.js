import { Box, Flex, Grid } from "@chakra-ui/react";
import { TagCard } from "../TagCard";

export const TagList = ({ tags = [], onClick = () => {} }) => {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)" // Dos columnas
      gap={2} // Espacio entre las cajas
      justifyContent="center"
    >
      {tags.map((tag, i) => (
        <Box
          key={i}
          onClick={() => {
            onClick(tag, tag._id, "_id");
          }}
        >
          <TagCard
            props={{
              title: tag.name,
            }}
          />
        </Box>
      ))}
    </Grid>
  );
};
