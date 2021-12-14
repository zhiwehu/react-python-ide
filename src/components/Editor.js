import { useDispatch } from "react-redux";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { setCode } from "../reducers/codeSlice";

const Editor = () => {
  const dispatch = useDispatch();
  const onChange = (newValue) => {
    dispatch(setCode(newValue));
  };
  return (
    <AceEditor
      fontSize="20px"
      width="100%"
      height="100%"
      mode="python"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
