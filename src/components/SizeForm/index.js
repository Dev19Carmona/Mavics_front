import {
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { Field, Form, Formik } from "formik";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { FaListUl } from "react-icons/fa";
import { useState, useEffect } from "react";
import { TbCategory } from "react-icons/tb";
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
  const categoriesSelectedControl = () => {
    
  }
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

                  <Flex justifyContent={"space-between"}>
                    <Text>Categorias:</Text>
                    <TbCategory fontSize={20} />
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
                          const copy = [...prevState];
                          copy.push(e.target.value);
                          return copy;
                        });
                      }}
                    >
                      {categories.map((cateogry, i) => (
                        <option key={i} value={cateogry._id}>
                          {cateogry.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>
                </Flex>
              </GridItem>
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
