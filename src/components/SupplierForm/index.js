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
import {
  FaCheckSquare,
  FaListUl,
} from "react-icons/fa";

export const SupplierForm = ({ props }) => {
  const {
    handleSubmitSupplierCreate,
    initialValuesSupplier,
  } = props;
  const { colorMode } = useColorModeGeneral();


  const handleKeyPress = (e) => {
    const key = e.key;
    if (!/[0-9]/.test(key)) {
      e.preventDefault();
    }
  };


  return (
    <Box userSelect="none" margin={4} p={4} borderRadius={9}>
      <Formik
        onSubmit={handleSubmitSupplierCreate}
        initialValues={initialValuesSupplier}
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
                    {values.name !== "" &&
                    values.phone !== "" &&
                    values.nit !== "" ? (
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
                  <FormControl id="phone">
                    <Field
                      name="phone"
                      as={Input}
                      type="text"
                      placeholder="Telefono"
                      required={false}
                    />
                  </FormControl>
                  <FormControl id="nit">
                    <Field
                      name="nit"
                      as={Input}
                      type="text"
                      placeholder="NIT"
                      required={false}
                      onKeyPress={handleKeyPress}
                    />
                  </FormControl>
                </Flex>
              </GridItem>
            </Grid>
            <Flex mt={10} justifyContent={"center"}>
              <ButtonSubmitGeneral title={"Crear Proveedor"} />
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
