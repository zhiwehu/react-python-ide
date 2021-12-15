import { useSelector } from "react-redux";
import {
  DrawerCloseButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  SimpleGrid,
} from "@chakra-ui/react";
import PythonFile from "./PythonFile";

const PythonFileList = ({ onClose, isOpen }) => {
  const files = useSelector((state) => state.code.files);
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">My Python Files</DrawerHeader>
        <DrawerBody p={0}>
          <SimpleGrid column={1} spacing={4}>
            {files.map((file) => (
              <PythonFile key={file.id} file={file} onClose={onClose} />
            ))}
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default PythonFileList;
