import {
  Box,
  Button,
  ChakraProps,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks/storeHooks";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export interface NoteTitleProps extends ChakraProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const NoteTitle = ({ onEdit, onDelete, ...props }: NoteTitleProps) => {
  const title = useAppSelector((state) => state.note.note.title);

  return (
    <HStack
      justifyContent="space-between"
      px={["1.2rem", "2.5rem", "4rem"]}
      py={[4, 5]}
      borderTopRadius={[0, 5]}
      borderWidth={1}
      borderLeftWidth={[0, 1]}
      borderRightWidth={[0, 1]}
    >
      <Box alignContent="center">
        <Box as="span" display={["none", "inline-block"]}>
          Note
        </Box>
        <Box as="h1" fontWeight="normal" fontSize={["2xl", "3xl", "4xl"]}>
          {title}
        </Box>
      </Box>
      <Menu autoSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          autoFocus={false}
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              if (onEdit) onEdit();
            }}
          >
            <EditIcon mr={2} /> Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (onDelete) onDelete();
            }}
          >
            <DeleteIcon mr={2} /> Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NoteTitle;
