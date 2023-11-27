import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiLogoReact } from "react-icons/bi";

export const InputGeneral = ({
  left = <Input pr="4.5rem" placeholder="PlaceHolder" />,
  right = <BiLogoReact />,
}) => {
  const {colorMode} = useColorModeGeneral()
  return (
    <InputGroup color={colorMode === "light" ? "body.light" : "body.dark"} size="md">
      {left}
      <InputRightElement width="4.5rem">{right}</InputRightElement>
    </InputGroup>
  );
};
