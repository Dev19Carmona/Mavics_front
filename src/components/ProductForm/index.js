import {
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { Field, Form, Formik } from "formik";
import { BiImageAdd } from "react-icons/bi";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { TagSelect } from "../TagSelect";
import { FaImage, FaListUl, FaTag } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { getLazyQuery } from "../../../config/_functions";

export const ProductForm = ({ props }) => {
  const {
    handleSubmitProductCreate,
    initialValuesProduct,
    handleSaveImageProduct,
    imageProduct,
    handleSearchTag,
    tags,
    tagFilter,
    handleSelectTag,
    tagsSelected,
    suppliersState = [],
    getSuppliers,
    getCategories
  } = props;
  
  const { colorMode } = useColorModeGeneral();
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getLazyQuery(getSuppliers, "suppliers", setSuppliers);
    getLazyQuery(getCategories, "categories", setCategories);
  }, [])
  
  const handleKeyPress = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault();
    }
  };
  const labelStyles = {
    cursor: "pointer",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <Box userSelect="none" boxShadow="lg" margin={4} p={4} borderRadius={9}>
      <Formik
        onSubmit={handleSubmitProductCreate}
        initialValues={initialValuesProduct}
      >
        {() => (
          <Form>
            <Grid
              gap={10}
              //templateColumns="repeat(2, 1fr)"
              //templateRows="repeat(2, 1fr)"
            >
              <GridItem>
                <Flex
                  gap={2}
                  flexDir={"column"}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text>Datos Generales:</Text>
                    <FaListUl fontSize={20} />
                  </Flex>
                  <FormControl id="name">
                    <Field
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="Nombre"
                      required={true}
                    />
                  </FormControl>
                  <FormControl id="description">
                    <Field
                      name="description"
                      as={Input}
                      type="text"
                      placeholder="Descripcion"
                      required={false}
                    />
                  </FormControl>
                  <FormControl id="amount">
                    <Field
                      name="amount"
                      as={Input}
                      type="number"
                      placeholder="Cantidad Inicial"
                      required={true}
                      onKeyPress={handleKeyPress}
                    />
                  </FormControl>
                  <FormControl id="price">
                    <Field
                      name="price"
                      as={Input}
                      type="number"
                      placeholder="Precio"
                      required={true}
                      onKeyPress={handleKeyPress}
                    />
                  </FormControl>
                </Flex>
              </GridItem>

              <GridItem>
                <Flex
                  gap={2}
                  flexDir={"column"}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text>Proveedores:</Text>
                    <LiaUsersCogSolid fontSize={20} />
                  </Flex>
                  <FormControl id="supplierId">
                    <Field
                      name="supplierId"
                      as={Select}
                      type="text"
                      placeholder="----"
                    >
                      {suppliers.map((supplier, i) => (
                        <option key={i} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <Flex justifyContent={"space-between"}>
                    <Text>Categorias:</Text>
                    <LiaUsersCogSolid fontSize={20} />
                  </Flex>
                  <FormControl id="categoryId">
                    <Field
                      name="categoryId"
                      as={Select}
                      type="text"
                      placeholder="----"
                    >
                      {categories.map((supplier, i) => (
                        <option key={i} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <Flex justifyContent={"space-between"}>
                    <Text>Tallas:</Text>
                    <LiaUsersCogSolid fontSize={20} />
                  </Flex>
                  <FormControl id="supplierId">
                    <Field
                      name="supplierId"
                      as={Select}
                      type="text"
                      placeholder="----"
                      disabled={true}
                    >
                      {suppliersState.map((supplier, i) => (
                        <option key={i} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                </Flex>
              </GridItem>

              <GridItem>
                <Flex
                  gap={2}
                  flexDir={"column"}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={"space-between"}>
                    {imageProduct ? (
                      <Text>Vista Previa</Text>
                    ) : (
                      <Text>Subir imagen del producto:</Text>
                    )}
                    <FaImage fontSize={20} />
                  </Flex>
                  <Flex className="product-container">
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        handleSaveImageProduct(e);
                      }}
                      style={{ display: "none" }}
                    />
                    <Flex
                      transition={"background-color 0.3s ease"}
                      _hover={{ bg: "black", color: "white" }}
                      cursor={"pointer"}
                      borderRadius={5}
                      m={"auto"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      bg={colorMode === "dark" ? "tags.dark" : "tags.light"}
                      color={colorMode === "dark" ? "black" : "white"}
                    >
                      <label htmlFor="image" style={labelStyles}>
                        <BiImageAdd fontSize={24} />
                        Subir imagen
                      </label>
                    </Flex>
                  </Flex>
                  {imageProduct && (
                    //<Collapse in={isOpen} animateOpacity>
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      position="absolute"
                      //className="product-preview"
                    >
                      <Flex
                        borderRadius={9}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                        flexDir={"column"}
                        position={"relative"}
                        left={20}
                        bottom={4}
                        boxShadow="xl"
                        rounded={"full"}
                      >
                        <Image
                          rounded={"full"}
                          src={URL.createObjectURL(imageProduct)}
                          alt="brandPreview"
                          objectFit="contain"
                          width={90}
                          height={90}
                        />
                      </Flex>
                    </Flex>
                    //</Collapse>
                  )}
                </Flex>
              </GridItem>
            </Grid>
            <Flex mt={10} justifyContent={"center"}>
              <ButtonSubmitGeneral title={"Crear Producto"} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
