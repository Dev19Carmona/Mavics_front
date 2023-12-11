import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Flex, Grid, GridItem, Image, Input, Text } from "@chakra-ui/react";
import { BoxPresentation } from "../BoxPresentation";
import { TableGeneral } from "../TableGeneral";
import { useState } from "react";
import { InputGeneral } from "../InputGeneral";

export const ProductPresentation = ({ props }) => {
  const { productPresentation } = props;
  const { sizes } = productPresentation;
  const { colorMode } = useColorModeGeneral();
  const indexSizes = ["Talla", "Cantidad"];
  const valuesSizeTable = ["name", "amount"];
  const [isEditing, setIsEditing] = useState("");
  const [data, setData] = useState(productPresentation);
  const handleDoubleClick = (value) => {
    setIsEditing(value);
  };
  const handleChange = (e, field) => {
    setData((prevState) => {
      const copy = { ...prevState };
      copy[field] = e.target.value;
      return copy;
    });
  };
  const handleBlur = () => {
    setIsEditing("");
    // Aquí puedes realizar la lógica para guardar el nuevo valor, por ejemplo, llamando a una función de actualización en tu componente principal.
  };

  return (
    <Grid
      gap={3}
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(3, 1fr)"
      letterSpacing={2}
      p={20}
    >
      <GridItem rowSpan={3}>
        <BoxPresentation
          body={
            <Image
              rounded={"full"}
              src={data?.urlImage}
              alt="img"
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />
          }
        />
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick("name");
        }}
      >
        {isEditing === "name" ? (
          <InputGeneral
            left={
              <Input
                onChange={(e) => {
                  handleChange(e, "name");
                }}
                onBlur={handleBlur}
                pr="4.5rem"
                value={data?.name}
                type="text"
                autoFocus
              />
            }
          />
        ) : (
          <BoxPresentation
            body={<Text fontWeight={"bold"}>{data?.name}</Text>}
          />
        )}
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick("description");
        }}
      >
        {isEditing === "description" ? (
          <InputGeneral
            left={
              <Input
                onChange={(e) => {
                  handleChange(e, "description");
                }}
                onBlur={handleBlur}
                pr="4.5rem"
                value={data?.description}
                type="text"
                autoFocus
              />
            }
          />
        ) : (
          <BoxPresentation body={<Text>{data?.description}</Text>} />
        )}
      </GridItem>

      <GridItem
        onDoubleClick={() => {
          handleDoubleClick("price");
        }}
      >
        {isEditing === "price" ? (
          <BoxPresentation
            body={
              <InputGeneral
                left={
                  <Input
                    onChange={(e) => {
                      handleChange(e, "price");
                    }}
                    onBlur={handleBlur}
                    pr="4.5rem"
                    value={data?.price}
                    type="number"
                    autoFocus
                  />
                }
              />
            }
          />
        ) : (
          <BoxPresentation
            body={<Text>$ {Math.floor(data?.price).toLocaleString()}</Text>}
          />
        )}
        {/* <BoxPresentation
          body={<Text>$ {Math.floor(data?.price).toLocaleString()}</Text>}
        /> */}
      </GridItem>

      <GridItem colSpan={2}>
        <BoxPresentation
          justify={null}
          body={
            <TableGeneral
              index={indexSizes}
              data={sizes}
              values={valuesSizeTable}
            />
          }
        />
      </GridItem>
    </Grid>
  );
};
