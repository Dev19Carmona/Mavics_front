import { Box, Flex, Input } from "@chakra-ui/react";
import { TagCard } from "../TagCard";
import { InputGeneral } from "../InputGeneral";
import { LiaSearchSolid } from "react-icons/lia";
import { ButtonSubmitGeneral } from "../ButtonSubmitGeneral";

export const ProductsFilterTagsSearch = ({
  tags = [],
  handleSearchTag = () => {},
}) => {
  return (
    <Flex
      ///height={}
      border={"1px solid"}
      gap={2}
      flexDir={"column"}
      width={"full"}
      p={2}
      //justifyContent={'center'}
      alignItems={"center"}
    >
      <Box width={"30%"}>
        <form>
          <InputGeneral
            left={
              <Input
                _focus={{border:'0.5px solid gray'}}
                pr="4.5rem"
                placeholder="Buscar Tag o Producto por nombre..."
                onChange={(e) => {
                  handleSearchTag(e.target.value);
                }}
              />
            }
            right={
              <ButtonSubmitGeneral
                onClick={(e)=>{
                  e.preventDefault();
                }}
                title=""
                rightIcon={<LiaSearchSolid />}
                variant="outline"
              />
            }
          />
        </form>
      </Box>
      <Flex
        justifyContent={tags.length >= 15 ? "start" : "center"}
        p={1}
        alignItems={"center"}
        width={"full"}
        gap={2}
        flexWrap={"wrap"}
        //border={'1px solid'}
      >
        {tags.map((tag, i) => (
          <Box key={i}>
            <TagCard
              props={{
                title: tag.name,
                isValue: tag.isValue,
              }}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
