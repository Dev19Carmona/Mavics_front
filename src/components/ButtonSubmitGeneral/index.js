import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export const ButtonSubmitGeneral = ({
  rightIcon = <ArrowForwardIcon />,
  color = "teal",
  variant = "solid",
  onClick = () => {},
  title,
  type = 'submit',
  isDisabled = false, 
}) => {
  return (
    <Button
      onClick={(e) => {
        onClick(e);
      }}
      rightIcon={rightIcon}
      colorScheme={color}
      variant={variant}
      type={type}
      isDisabled={isDisabled}
    >
      {title && title}
    </Button>
  );
};
