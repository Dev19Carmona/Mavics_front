import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Grid } from "@chakra-ui/react";
import { iconSize } from "../../../config/_disappointed";

export const HoverButton = ({body, onClick}) =>{
  const {colorMode} = useColorModeGeneral()
  return (
  
    <Grid
      alignItems={"center"}
      // _hover={{ borderBottom: "2px solid", borderColor: "red" }}
      className="itemNav"
      cursor={"pointer"}
      onClick={onClick}
      p={2}
      fontSize={iconSize}
      color={colorMode === "light" ? "header.light" : "header.dark"}
    >
      {body}
    </Grid>
  );
}
