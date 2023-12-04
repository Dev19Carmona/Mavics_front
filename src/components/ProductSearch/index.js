import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { InputGeneral } from "../InputGeneral";
import { GiMagnifyingGlass } from "react-icons/gi";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { TagListDeploy } from "../TagListDeploy";
import { useState, useEffect } from "react";
import { SelectGeneral } from "../SelectGeneral";
import { BiSolidTrash } from "react-icons/bi";
import { ItemCard } from "../ItemCard";
import { ProductSearchBox } from "../ProductSearchBox";
import { getLazyQuery } from "../../../config/_functions";

export const ProductSearch = ({
  tags = [],
  handleSearchProduct = () => {},
  handleSubmitSearchProductPerTag,
  suppliers = [],
  getSuppliers,
  handleSubmitSearchProductPerSupplier,
  handleDeleteFilters,
  handleFilterProducts,
  getCategories,
  getSizes,
}) => {
  const { colorMode } = useColorModeGeneral();
  const [categoriesState, setCategoriesState] = useState([]);
  const [sizesState, setSizesState] = useState([]);



  return (
    <Flex
      borderRadius={9}
      boxShadow={"xl"}
      gap={5}
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Button
        justifyContent={"center"}
        alignItems={"center"}
        bg={colorMode === "light" ? "red.600" : "red.300"}
        padding={2}
        color={colorMode === "light" ? "white" : "black"}
        cursor={"pointer"}
        onClick={handleDeleteFilters}
      >
        <BiSolidTrash fontSize={18} />
      </Button>

      <Box w={"20%"}>
        <InputGeneral
          left={
            <Input
              width={"full"}
              _focus={{ border: "1px solid teal" }}
              _hover={{ border: "2px solid gray" }}
              _selected={false}
              border={"0.2px solid gray"}
              pr="4.5rem"
              placeholder="Buscar..."
              onChange={(e) => {
                handleSearchProduct(e.target.value);
                handleFilterProducts({ key: "name", value: e.target.value });
              }}
            />
          }
          right={<GiMagnifyingGlass />}
        />
      </Box>

      <Box
        width={"35%"}
        onClick={() => {
          getLazyQuery(getSizes, "sizes", setSizesState);
        }}
      >
        <SelectGeneral
          titleSelect="Tallas"
          items={sizesState}
          handleSubmit={handleFilterProducts}
          reference={"tag"}
        />
      </Box>
      <Box
        width={"35%"}
        onClick={() => {
          getLazyQuery(getCategories, "categories", setCategoriesState);
        }}
      >
        <SelectGeneral
          handleSubmit={handleFilterProducts}
          items={categoriesState}
          titleSelect="Categorias"
          reference={"provider"}
        />
      </Box>
      <Button colorScheme="teal" fontSize={"sm"} letterSpacing={1}>
        Filtrar
      </Button>
    </Flex>
  );
};
