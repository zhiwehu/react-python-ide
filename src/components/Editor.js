import { useSelector, useDispatch } from "react-redux";
import { useColorMode } from "@chakra-ui/react";
import AceEditor from "react-ace";
import { setCurrentFile } from "../reducers/pythonFileListSlice";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";

const Editor = ({ editorRef }) => {
  const dispatch = useDispatch();
  const currentFile = useSelector((state) => state.code.currentFile);
  const code = currentFile !== null ? currentFile.code : "";
  const fontSize = useSelector((state) => state.settings.fontSize);
  const { colorMode } = useColorMode();

  const onChange = (code) => {
    dispatch(setCurrentFile({ ...currentFile, code: code }));
  };

  return (
    <AceEditor
      onChange={onChange}
      ref={editorRef}
      defaultValue={code}
      value={code}
      fontSize={fontSize}
      width="100%"
      height="100%"
      mode="python"
      theme={colorMode === "light" ? "clouds" : "clouds_midnight"}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
