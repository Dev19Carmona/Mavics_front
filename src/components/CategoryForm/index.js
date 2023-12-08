import {
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";
import { Field, Form, Formik } from "formik";
import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { FaCheckSquare, FaListUl } from "react-icons/fa";

export const CategoryForm = ({ props }) => {
  const { initialValuesCategory, handleSubmitCategoryCreate } = props;
  const { colorMode } = useColorModeGeneral();

  const handleKeyPress = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault();
    }
  };
const validations = () => {

}
  return (
    <Box userSelect="none" margin={4} p={4} borderRadius={9}>
      <Formik
        onSubmit={handleSubmitCategoryCreate}
        initialValues={initialValuesCategory}
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
                    {
                      values.name === ''?
                    <FaListUl fontSize={20} />:
                    <FaCheckSquare fontSize={20} color="teal"/> 
                    }
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
