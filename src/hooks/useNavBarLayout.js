import { LoginContext } from "@/context/Session";
import { ModalOverlay, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export const useNavBarLayout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const localSession = useContext(LoginContext);
  const [isExpired, setIsExpired] = useState(false)
  useEffect(() => {
    setIsExpired(localSession?.localSession?.expireSession)
  }, [setIsExpired, localSession?.localSession?.expireSession])
  

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
  const handleOpenModalLogout = () => {
    
    setOverlay(<OverlayTwo />);
    onOpen();
  };
  //const [logout, setLogout] = useState(second)
  return {
    toggleColorMode,
    colorMode,
    handleOpenModalLogout,
    isOpen,
    onClose,
    overlay,
    localSession,
    isExpired
  };
};
