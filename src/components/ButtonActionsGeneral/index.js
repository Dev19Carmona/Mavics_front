import { Button, Flex } from "@chakra-ui/react";

export const ButtonActionsGeneral = ({ props }) => {
  const { leftButton, rightButton } = props;
  return (
    <Flex justifyContent={"space-around"} alignItems={"center"}>
      <Button onClick={rightButton.click} colorScheme={rightButton.color}>
        {rightButton.title}
      </Button>
      <Button onClick={leftButton.click} colorScheme={leftButton.color}>
        {leftButton.title}
      </Button>
    </Flex>
  );
};
