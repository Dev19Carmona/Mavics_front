import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TagList } from "../TagList";
import { TagCard } from "../TagCard";
import { useEffect, useState } from "react";

export const TagSelect = ({
  handleChange,
  tags,
  tagFilter,
  handleSelectTag,
  tagsSelected = [],
}) => {
  const { colorMode } = useColorModeGeneral();
  const [openColl, setOpenColl] = useState(false);
  useEffect(() => {
    if (tagFilter === "") setOpenColl(false);
    else setOpenColl(true);
  }, [tagFilter]);

  return (
    <Flex
      p={2}
      fontSize={10}
      flexDirection={"column"}
      
      borderRadius={9}
      gap={2}
      width={'100%'}
      height={'100%'}
    >
      <Input
      
        type="text"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        placeholder="Agregar Tag"
        _placeholder={{
          color: colorMode === "light" ? "black" : "white",
          opacity: 0.5,
        }}
      />

      <Collapse in={openColl} animateOpacity>
        <Flex
        borderBottomLeftRadius={9}
        borderBottomRightRadius={9}
        bg={colorMode === "light" ? "window.light" : "window.dark"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          position="absolute"
          
        >
          <Flex
            //flexDir={"column"}
            alignItems={"center"}
            position="relative"
            width={'620px'}
            justifyContent={'space-around'}
          >
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              p={5}
            >
              {tagFilter !== "" && tagFilter != tags?.tags[0]?.name && (
                <>
                  <Text opacity={0.5}>Nuevo</Text>
                  <Box
                    onClick={() => {
                      handleSelectTag({ name: tagFilter });
                    }}
                  >
                    <TagCard props={{ title: tagFilter }} />
                  </Box>
                </>
              )}
            </Flex>   
            {tags?.tags.length > 0 && tagFilter !== "" && (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={4}
                flexDirection={"column"}
              >
                <Text opacity={0.5}>Existentes</Text>
                <TagList onClick={handleSelectTag} tags={tags?.tags} />
              </Flex>
            )}

            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              p={5}
            >
              {tagsSelected.length > 0 && (
                <>
                  <Text opacity={0.5}>Agregados</Text>
                  <TagList
                    onClick={() => {
                      console.log("quitar tag");
                    }}
                    tags={tagsSelected}
                  />
                </>
              )}
            </Flex>

          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  );
};
