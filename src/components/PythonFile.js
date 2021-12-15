import { useDispatch } from "react-redux";
import {
  Text,
  HStack,
  VStack,
  Heading,
  Spacer,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deleteFile, setCurrentFile } from "../reducers/pythonFileListSlice";

const PythonFile = ({ file, onClose }) => {
  const dispatch = useDispatch();
  const onClickEdit = (file) => {
    dispatch(setCurrentFile(file));
    onClose();
  };
  const onClickDelete = (file) => {
    dispatch(deleteFile(file.id));
  };
  const { colorMode } = useColorMode();
  return (
    <HStack
      spacing={4}
      justify="space-between"
      align="center"
      w="full"
      px={4}
      py={2}
      onDoubleClick={() => onClickEdit(file)}
      _hover={{ bg: colorMode === "light" ? "lightgreen" : "darkgreen" }}
    >
      <VStack align="flex-start">
        <Heading as="h6" variant="h6" size="sm">
          {file.title}
        </Heading>
        <Text fontSize="xs">{file.datetime}</Text>
      </VStack>
      <Spacer />
      <HStack>
        <IconButton
          colorScheme="blue"
          icon={<FaEdit />}
          onClick={() => onClickEdit(file)}
        />
        <IconButton
          colorScheme="red"
          icon={<FaTrash />}
          onClick={() => onClickDelete(file)}
        />
      </HStack>
    </HStack>
  );
};

export default PythonFile;
