import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { BsCode } from "react-icons/bs";

import Editor from "../components/Editor";
import IDEBox from "../components/IDEBox";
import { toggleCodeSize, setFontSize } from "../reducers/IDESettingsSlice";

const CodeArea = ({ editorRef }) => {
  const codeFullSize = useSelector((state) => state.settings.codeFullSize);
  const canvasFullSize = useSelector((state) => state.settings.canvasFullSize);
  const consoleFullSize = useSelector(
    (state) => state.settings.consoleFullSize
  );

  const dispatch = useDispatch();

  let codeDisplay = "flex";
  if (canvasFullSize || consoleFullSize) {
    codeDisplay = "none";
  }
  return (
    <Flex
      id="code"
      minH="50%"
      h="99%"
      flexGrow={2}
      w={{ base: "100%", lg: "67%" }}
      minW="67%"
      display={codeDisplay}
      pb={{ base: 2, lg: 0 }}
    >
      <IDEBox
        title="Code"
        editorRef={editorRef}
        toggleFullSize={() => dispatch(toggleCodeSize())}
        fullSize={codeFullSize}
        titleIcon={BsCode}
        setFZ={(fz) => dispatch(setFontSize(fz))}
      >
        <Editor editorRef={editorRef} />
      </IDEBox>
    </Flex>
  );
};

export default CodeArea;
