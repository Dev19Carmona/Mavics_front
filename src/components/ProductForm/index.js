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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { Field, Form, Formik, useField } from "formik";
import { BiImageAdd } from "react-icons/bi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
CiCirclePlus;
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { TagSelect } from "../TagSelect";
import {
  FaCheckSquare,
  FaGenderless,
  FaImage,
  FaListUl,
  FaTag,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { LiaUsersCogSolid } from "react-icons/lia";
import { formatPrice, getLazyQuery } from "../../../config/_functions";
import { GENDERS } from "../../../config/_constants";
import { TbCategory, TbRulerMeasure } from "react-icons/tb";

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
    getCategories,
    getSizes,
    sizesSelected, 
    setSizesSelected
  } = props;

  const { colorMode } = useColorModeGeneral();
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);

  
  useEffect(() => {
    if (suppliers.length === 0)
      getLazyQuery(getSuppliers, "suppliers", setSuppliers);
    if (categories.length === 0)
      getLazyQuery(getCategories, "categories", setCategories);
  }, [getSuppliers, setCategories, setSuppliers, getCategories, suppliers, categories]);

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
  const addSizes = (id, operation = true) => {
    //operation: true = suma / false = resta
    const size = sizes.find((element) => element._id === id);
    const existingSize = sizesSelected.find(
      (sizeSelected) => sizeSelected._id === id
    );
    if (existingSize) {
      const newSizeList = sizesSelected.map((sizeSelected) =>
        sizeSelected._id === id
          ? {
              ...sizeSelected,
              amount: sizeSelected.amount + 1,
            }
          : sizeSelected
      );
      setSizesSelected(newSizeList);
    } else {
      setSizesSelected([
        ...sizesSelected,
        { _id: id, name: size.name, amount: 1 },
      ]);
    }
  };
  const subtractSizes = (id) => {
    const existingSize = sizesSelected.find(
      (sizeSelected) => sizeSelected._id === id
    );

    if (existingSize) {
      const newSizeList = sizesSelected.map((sizeSelected) =>
        sizeSelected._id === id
          ? {
              ...sizeSelected,
              amount: sizeSelected.amount - 1,
            }
          : sizeSelected
      );

      // Filtrar los tamaños que no tienen cantidad positiva
      const filteredSizeList = newSizeList.filter(
        (sizeSelected) => sizeSelected.amount > 0
      );

      setSizesSelected(filteredSizeList);
    }
  };
  return (
    <Box userSelect="none" margin={4} p={4} borderRadius={9}>
      <Formik
        onSubmit={handleSubmitProductCreate}
        initialValues={initialValuesProduct}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Grid
              gap={10}
              //templateColumns="repeat(2, 1fr)"
              //templateRows="repeat(2, 1fr)"
            >
              <GridItem>
                <Flex
                  gap={2}
                  flexDir={'column'}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={'space-between'}>
                    <Text>Datos Generales:</Text>
                    {values.name !== '' &&
                    values.description !== '' &&
                    values.price !== '' ? (
                      <FaCheckSquare fontSize={20} color="teal" />
                    ) : (
                      <FaListUl fontSize={20} />
                    )}
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
                  <FormControl id="price">
                    <Field
                      name="price"
                      as={Input}
                      type="number"
                      placeholder="Precio"
                      required={true}
                      onKeyPress={handleKeyPress}
                      // onChange={(e) => {
                      //   setFieldValue('price', e.target.value)
                      // }}
                    />
                  </FormControl>
                </Flex>
              </GridItem>

              <GridItem>
                <Flex
                  gap={2}
                  flexDir={'column'}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={'space-between'}>
                    {imageProduct ? (
                      <Text>Vista Previa</Text>
                    ) : (
                      <Text>Subir imagen del producto:</Text>
                    )}
                    {imageProduct ? (
                      <FaCheckSquare fontSize={20} color="teal" />
                    ) : (
                      <FaImage fontSize={20} />
                    )}
                  </Flex>

                  <Flex className="product-container">
                    {imageProduct && (
                      //<Collapse in={isOpen} animateOpacity>
                      <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        //position="absolute"
                        //className="product-preview"
                      >
                        <Flex
                          borderRadius={9}
                          justifyContent={'center'}
                          alignItems={'center'}
                          gap={2}
                          flexDir={'column'}
                          position={'relative'}
                          left={20}
                          bottom={4}
                          boxShadow="xl"
                          rounded={'full'}
                        >
                          <Image
                            rounded={'full'}
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
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        handleSaveImageProduct(e)
                      }}
                      style={{ display: 'none' }}
                    />
                    <Flex
                      transition={'background-color 0.3s ease'}
                      _hover={{ bg: 'black', color: 'white' }}
                      cursor={'pointer'}
                      borderRadius={5}
                      m={'auto'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      bg={colorMode === 'dark' ? 'tags.dark' : 'tags.light'}
                      color={colorMode === 'dark' ? 'black' : 'white'}
                    >
                      <label htmlFor="image" style={labelStyles}>
                        <BiImageAdd fontSize={24} />
                        {imageProduct ? '' : 'Subir imagen'}
                      </label>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>

              <GridItem>
                <Flex
                  gap={2}
                  flexDir={'column'}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={'space-between'}>
                    <Text>Genero:</Text>
                    {values.gender === '' ? (
                      <FaGenderless fontSize={20} />
                    ) : (
                      <FaCheckSquare fontSize={20} color="teal" />
                    )}
                  </Flex>
                  <FormControl id="gender">
                    <Field
                      name="gender"
                      as={Select}
                      type="text"
                      placeholder="----"
                    >
                      {GENDERS.map((gender) => (
                        <option key={gender.id} value={gender.key}>
                          {gender.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <Flex justifyContent={'space-between'}>
                    <Text>Proveedores:</Text>
                    {values.supplierId === '' ? (
                      <FaUsers fontSize={20} />
                    ) : (
                      <FaCheckSquare fontSize={20} color="teal" />
                    )}
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

                  <Flex justifyContent={'space-between'}>
                    <Text>Categorias:</Text>
                    {values.categoryId === '' ? (
                      <TbCategory fontSize={20} />
                    ) : (
                      <FaCheckSquare fontSize={20} color="teal" />
                    )}
                  </Flex>
                  <FormControl id="categoryId">
                    <Field
                      name="categoryId"
                      as={Select}
                      type="text"
                      placeholder="----"
                      onChange={(e) => {
                        setFieldValue('categoryId', e.target.value)
                        const array = [e.target.value]
                        getLazyQuery(getSizes, 'sizes', setSizes, {
                          variables: {
                            filter: {
                              categoryIds: [e.target.value],
                            },
                          },
                        })
                      }}
                    >
                      {categories.map((cateogry, i) => (
                        <option key={i} value={cateogry._id}>
                          {cateogry.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <Flex
                    color={
                      !values.categoryId || sizes.length === 0
                        ? 'gray'
                        : 'white'
                    }
                    justifyContent={'space-between'}
                  >
                    <Text
                      color={
                        !values.categoryId || sizes.length === 0
                          ? 'gray'
                          : 'black'
                      }
                    >
                      Tallas:
                    </Text>
                    {values.sizeId === '' ? (
                      <TbRulerMeasure fontSize={20} />
                    ) : (
                      <FaCheckSquare fontSize={20} color="teal" />
                    )}
                  </Flex>

                  <FormControl id="sizeId">
                    <Field
                      name="sizeId"
                      as={Select}
                      type="text"
                      placeholder="----"
                      disabled={!values.categoryId || sizes.length === 0}
                      onChange={(e) => {
                        setFieldValue('sizeId', e.target.value)
                        addSizes(e.target.value)
                      }}
                    >
                      {sizes.map((size, i) => (
                        <option key={i} value={size._id}>
                          {size.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                </Flex>
              </GridItem>
              {sizesSelected.length > 0 ? (
                <GridItem>
                  <Flex
                    gap={2}
                    flexDir={'column'}
                    p={4}
                    boxShadow="md"
                    borderRadius={9}
                  >
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Talla</Th>
                            <Th>Cantidad</Th>
                          </Tr>
                        </Thead>
                        {sizesSelected.map((sizeSelected, i) => (
                          <Tbody key={i}>
                            <Tr>
                              <Td>{sizeSelected.name}</Td>
                              <Td>
                                <Flex
                                  gap={5}
                                  alignItems={'center'}
                                  justifyContent={'center'}
                                >
                                  <ButtonSubmitGeneral
                                    type="button"
                                    onClick={() => {
                                      subtractSizes(sizeSelected._id)
                                    }}
                                    title={<CiCircleMinus fontSize={25} />}
                                    rightIcon={null}
                                  />
                                  <Text>{sizeSelected.amount}</Text>
                                  <ButtonSubmitGeneral
                                    type="button"
                                    onClick={() => {
                                      addSizes(sizeSelected._id)
                                    }}
                                    title={<CiCirclePlus fontSize={25} />}
                                    rightIcon={null}
                                  />
                                </Flex>
                              </Td>
                            </Tr>
                          </Tbody>
                        ))}
                      </Table>
                    </TableContainer>
                  </Flex>
                </GridItem>
              ) : null}
            </Grid>
            <Flex mt={10} justifyContent={'center'}>
              <ButtonSubmitGeneral title={'Crear'} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  )
};
