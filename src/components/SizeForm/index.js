import {
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { Field, Form, Formik } from "formik";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  FaCheckSquare,
  FaListUl,
  FaDeleteLeft,
  FaRegTrashAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { TbCategory, TbGitBranchDeleted } from "react-icons/tb";
import { getLazyQuery } from "../../../config/_functions";

export const SizeForm = ({ props }) => {
  const {
    initialValuesSize,
    handleSubmitSizeCreate,
    getCategories,
    setCategorySelected,
    categorySelected,
  } = props;
  const { colorMode } = useColorModeGeneral();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (categories.length === 0)
      getLazyQuery(getCategories, "categories", setCategories);
  }, [setCategories, getCategories, categories]);
  const categoriesSelectedControl = () => {};
  const handleKeyPress = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <Box userSelect="none" margin={4} p={4} borderRadius={9}>
      <Formik
        onSubmit={handleSubmitSizeCreate}
        initialValues={initialValuesSize}
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
                  flexDir={"column"}
                  p={4}
                  boxShadow="md"
                  borderRadius={9}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text>Datos:</Text>
                    {values.name !== "" ? (
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

                  <Flex justifyContent={"space-between"}>
                    <Text>Categorias:</Text>
                    {values.categoryId !== "" ? (
                      <FaCheckSquare fontSize={20} color="teal" />
                    ) : (
                      <TbCategory fontSize={20} />
                    )}
                  </Flex>
                  <FormControl id="categoryId">
                    <Field
                      name="categoryId"
                      as={Select}
                      type="text"
                      placeholder="----"
                      onChange={(e) => {
                        setFieldValue("categoryId", e.target.value);
                        setCategorySelected((prevState) => {
                          const newCategory = JSON.parse(e.target.value);
                          const copy = [...prevState];
                          if (!copy.includes(newCategory))
                            copy.push(newCategory);

                          return copy;
                        });
                      }}
                    >
                      {categories.map((cateogry, i) => (
                        <option key={i} value={JSON.stringify(cateogry)}>
                          {cateogry.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                </Flex>
              </GridItem>
              {categorySelected.length > 0 ? (
                <GridItem>
                  <Flex
                    gap={2}
                    flexDir={"column"}
                    p={4}
                    boxShadow="md"
                    borderRadius={9}
                  >
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Categoria</Th>
                            <Th>Accion</Th>
                          </Tr>
                        </Thead>
                        {categorySelected.map((category, i) => (
                          <Tbody key={i}>
                            <Tr>
                              <Td>{category.name}</Td>
                              <Td>
                                <Flex
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  w={"20%"}
                                  bg={"red.300"}
                                  p={2}
                                  borderRadius={9}
                                  color={colorMode !== "light" ? "body.light" : "body.dark"}
                                  cursor={'pointer'}
                                  onClick={()=>{
                                    setCategorySelected(prevState=>{
                                      let copy = [...prevState]
                                      if(copy.includes(category)){
                                        copy = copy.filter(element => element !== category)
                                      }
                                      return copy
                                    })
                                  }}
                                >
                                  <FaRegTrashAlt />
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
            <Flex mt={10} justifyContent={"center"}>
              <ButtonSubmitGeneral title={"Crear Categoria"} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
