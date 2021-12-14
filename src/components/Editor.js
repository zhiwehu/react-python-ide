import { useSelector } from "react-redux";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

const Editor = ({ editorRef }) => {
  const code = useSelector((state) => state.code.code);

  return (
    <AceEditor
      ref={editorRef}
      defaultValue={code}
      fontSize="20px"
      width="100%"
      height="100%"
      mode="python"
      theme="github"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      onLoad={(editor) => {
        editor.once("change", () => {
          editor.session.getUndoManager().reset();
        });
      }}
    />
  );
};

export default Editor;
