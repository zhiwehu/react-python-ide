import { useSelector } from "react-redux";
import { useColorMode } from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";

const Editor = ({ editorRef }) => {
  const currentFile = useSelector((state) => state.code.currentFile);
  const code = currentFile !== null ? currentFile.code : "";
  const { colorMode } = useColorMode();
  return (
    <AceEditor
      ref={editorRef}
      defaultValue={code}
      value={code}
      fontSize={16}
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
