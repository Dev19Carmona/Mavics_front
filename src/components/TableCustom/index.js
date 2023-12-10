import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { TagCard } from "../TagCard";

export const TableCustom = ({
  index = ['id', 'nombre'],
  data = [

    { __typename: 'Category', _id: '476879a8-f2e3-4ee4-9e5e-893c4b212893', isRemove: false, name: 'Camisetas' },
  
    { __typename: 'Category', _id: 'c4f750f9-d40d-448a-a6ae-f9f68b486612', isRemove: false, name: 'Pantalones' },
  
    { __typename: 'Category', _id: '898ae9f0-df0e-4865-acf2-56c5b3bb349a', isRemove: false, name: 'Gafas' },
  
    { __typename: 'Category', _id: 'b49899db-1e21-4c89-8586-9e31e6e963a7', isRemove: false, name: 'Relojes' },
  
    { __typename: 'Category', _id: '7187ca3f-f596-42a0-b4e0-b50e297cb2c4', isRemove: false, name: 'Tenis' }
  
  ],
  values = [],
  variant = "unstyled",
}) => {
  const { colorMode } = useColorModeGeneral();

  return (
    <Box p={2}>
      <Flex justifyContent={"space-around"}>
        {
            index.map(i=>(
                <Text fontWeight={'bold'} fontSize={20}>{i.toLocaleUpperCase()}</Text>
            ))
        }
      </Flex>
      {
        
      }
    </Box>
  );
};
