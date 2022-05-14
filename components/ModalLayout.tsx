import {
  ChakraProps,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ModalLayoutProps extends ChakraProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement | ReactElement[] | string;
}

const ModalLayout = ({ isOpen, onClose, children }: ModalLayoutProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="#0F111A">{children}</ModalContent>
    </Modal>
  );
};

export default ModalLayout;
