import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

export const ModalGeneral = ({
  isOpen,
  onClose,
  overlay,
  title = "ModalTitle",
  body = <Box>Body</Box>,
  size = "md",
  color = "black",
}) => {
  return (
    <Modal scrollBehavior={'inside'} size={size} isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalHeader color={color}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
