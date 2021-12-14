import { useDispatch } from "react-redux";
import { IconButton, HStack } from "@chakra-ui/react";
import {
  FaUndo,
  FaRedo,
  FaPlay,
  FaFile,
  FaSave,
  FaDemocrat,
} from "react-icons/fa";
import { setCode, demoCode } from "../reducers/codeSlice";

const MenuButtons = ({ editorRef, handleRunCode }) => {
  const dispatch = useDispatch();

  const saveCode = () => {
    const code = editorRef.current.editor.getValue();
    dispatch(setCode(code));
    localStorage.setItem("code", code);
  };

  const setDemoCode = () => {
    editorRef.current.editor.setValue(demoCode);
    dispatch(setCode(demoCode));
    localStorage.setItem("code", demoCode);
  };

  return (
    <HStack spacing={2} justify="space-between">
      <IconButton
        aria-label="New File"
        icon={<FaFile />}
        onClick={() => {
          localStorage.setItem("code", "");
          editorRef.current.editor.setValue("");
          dispatch(setCode(""));
        }}
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
        icon={<FaDemocrat />}
        onClick={() => setDemoCode()}
      />
    </HStack>
  );
};

export default MenuButtons;
