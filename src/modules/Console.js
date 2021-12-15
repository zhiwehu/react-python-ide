import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { VscDebugConsole } from "react-icons/vsc";

import XTerminal from "../components/XTerminal";
import IDEBox from "../components/IDEBox";
import { toggleConsoleSize } from "../reducers/IDEWindowSizeSlice";

const Console = ({ terminalRef }) => {
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );

  const dispatch = useDispatch();

  let consoleDisplay = "flex";
  if (canvasFullSize || codeFullSize) {
    consoleDisplay = "none";
  }
  return (
    <Flex
      id="console"
      w="100%"
      h={{ base: "70vh", lg: "50%" }}
      minH="50%"
      mt="0px !important"
      flexGrow={1}
      display={consoleDisplay}
    >
      <IDEBox
        title="Console"
        toggleFullSize={() => dispatch(toggleConsoleSize())}
        fullSize={consoleFullSize}
        titleIcon={VscDebugConsole}
      >
        <XTerminal terminalRef={terminalRef} />
      </IDEBox>
    </Flex>
  );
};

export default Console;
