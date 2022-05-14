import {
  Button,
  ChakraProps,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ModalLayout from "./ModalLayout";
import { ThemeTypings } from "@chakra-ui/styled-system";

export interface OnInvokeArgs {
  editCode: string;
  setErrors: (errors: string[]) => void;
  setLoading: (value: boolean) => void;
}

export interface EditCodeModalProps extends ChakraProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
  buttonColorScheme?: ThemeTypings["colorSchemes"];
  initialEditCode?: string;
  onInvoke: (args: OnInvokeArgs) => void;
}

const EditCodeModal = ({
  isOpen,
  onClose,
  onInvoke,
  initialEditCode = "",
  buttonText = "Enter",
  buttonColorScheme = "orange",
}: EditCodeModalProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Enter your edit code</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {errors.map((error) => (
          <Text color="red.300" mb={[2, 4]} key={error}>
            {error}
          </Text>
        ))}
        <Input
          defaultValue={initialEditCode}
          ref={inputRef}
          colorScheme="orange"
          autoFocus
        />
      </ModalBody>
      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          colorScheme={buttonColorScheme}
          onClick={() => {
            const editCode = inputRef?.current?.value ?? "";
            onInvoke({
              editCode,
              setErrors,
              setLoading,
            });
          }}
        >
          {loading ? <Spinner /> : buttonText}
        </Button>
      </ModalFooter>
    </ModalLayout>
  );
};

export default EditCodeModal;
