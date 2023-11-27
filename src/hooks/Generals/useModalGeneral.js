import { ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export const useModalGeneral = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  return {
    isOpen,
    onClose,
    overlay,
    onOpen,
    setOverlay,
    OverlayTwo,
    OverlayOne
  };
};
