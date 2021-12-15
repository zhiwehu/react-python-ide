import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { IconButton, HStack, useDisclosure } from "@chakra-ui/react";
import {
  FaUndo,
  FaRedo,
  FaPlay,
  FaFile,
  FaSave,
  FaSmile,
  FaListUl,
} from "react-icons/fa";
import {
  setCurrentFile,
  demoCode,
  getCurrentDateTime,
  addFile,
  updateFile,
} from "../reducers/pythonFileListSlice";
import PythonFileList from "./PythonFileList";

const MenuButtons = ({ editorRef, handleRunCode }) => {
  const dispatch = useDispatch();
  const currentFile = useSelector((state) => state.code.currentFile);

  const createCode = () => {
    const newFile = {
      id: null,
      title: "unnamed",
      code: "",
      datetime: getCurrentDateTime(),
    };
    dispatch(setCurrentFile(newFile));
  };

  const saveCode = () => {
    const code = editorRef.current.editor.getValue();
    const f = {
      ...currentFile,
      code: code,
      datetime: getCurrentDateTime(),
    };
    if (f.id === null) {
      f.id = uuid4();
      dispatch(addFile(f));
    } else {
      dispatch(updateFile(f));
    }
    dispatch(setCurrentFile(f));
  };

  const setDemoCode = () => {
    const newFile = {
      id: null,
      title: "demo",
      code: demoCode,
      datetime: getCurrentDateTime(),
    };
    dispatch(setCurrentFile(newFile));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="My Python Files"
        icon={<FaListUl />}
        onClick={onOpen}
      />
      <PythonFileList onClose={onClose} isOpen={isOpen} />
      <IconButton
        aria-label="New File"
        icon={<FaFile />}
        onClick={createCode}
      />
      <IconButton
        aria-label="Undo"
        icon={
          <FaUndo
            onClick={() => {
              editorRef.current.editor.undo();
            }}
          />
        }
      />
      <IconButton
        aria-label="Redo"
        icon={<FaRedo />}
        onClick={() => {
          editorRef.current.editor.redo();
        }}
      />
      <IconButton aria-label="Run" icon={<FaPlay />} onClick={handleRunCode} />
      <IconButton
        aria-label="Save"
        icon={<FaSave />}
        onClick={() => saveCode()}
      />
      <IconButton
        aria-label="Demo Code"
        icon={<FaSmile />}
        onClick={() => setDemoCode()}
      />
    </HStack>
  );
};

export default MenuButtons;
