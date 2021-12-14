import { useSelector } from "react-redux";
import { useColorMode } from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";

const Editor = ({ editorRef }) => {
  const code = useSelector((state) => state.code.code);
  const { colorMode } = useColorMode();
  return (
    <AceEditor
      ref={editorRef}
      defaultValue={code}
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
