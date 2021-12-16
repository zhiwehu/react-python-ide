import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid4 } from "uuid";
import { IconButton, HStack, Tooltip, useDisclosure } from "@chakra-ui/react";
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
    <HStack spacing={1}>
      <Tooltip label="My Python Files">
        <IconButton
          aria-label="My Python Files"
          icon={<FaListUl />}
          onClick={onOpen}
        />
      </Tooltip>
      <PythonFileList onClose={onClose} isOpen={isOpen} />
      <Tooltip label="New File">
        <IconButton
          aria-label="New File"
          icon={<FaFile />}
          onClick={createCode}
        />
      </Tooltip>
      <Tooltip label="Undo">
        <IconButton
          aria-label=""
          icon={
            <FaUndo
              onClick={() => {
                editorRef.current.editor.undo();
              }}
            />
          }
        />
      </Tooltip>
      <Tooltip label="Redo">
        <IconButton
          aria-label="Redo"
          icon={<FaRedo />}
          onClick={() => {
            editorRef.current.editor.redo();
          }}
        />
      </Tooltip>
      <Tooltip label="Run">
        <IconButton
          aria-label="Run"
          icon={<FaPlay />}
          onClick={handleRunCode}
        />
      </Tooltip>
      <Tooltip label="Save">
        <IconButton
          aria-label="Save"
          icon={<FaSave />}
          onClick={() => saveCode()}
        />
      </Tooltip>
      <Tooltip label="Demo Code">
        <IconButton
          aria-label="Demo Code"
          icon={<FaSmile />}
          onClick={() => setDemoCode()}
        />
      </Tooltip>
    </HStack>
  );
};

export default MenuButtons;
