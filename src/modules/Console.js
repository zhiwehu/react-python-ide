import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { VscDebugConsole } from "react-icons/vsc";

import XTerminal from "../components/XTerminal";
import IDEBox from "../components/IDEBox";
import {
  toggleConsoleSize,
  toggleShowHideConsole,
} from "../reducers/IDEWindowSizeSlice";

const Console = ({ terminalRef }) => {
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const show = useSelector((state) => state.windowSize.consoleShow);
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
      minH={show ? "50%" : "0px"}
      mt="0px !important"
      ml="0px !important"
      flexGrow={show ? 1 : 0}
      display={consoleDisplay}
      pb={2}
    >
      <IDEBox
        title="Console"
        toggleFullSize={() => dispatch(toggleConsoleSize())}
        toggleShowHide={() => dispatch(toggleShowHideConsole())}
        fullSize={consoleFullSize}
        show={show}
        titleIcon={VscDebugConsole}
      >
        <XTerminal terminalRef={terminalRef} />
      </IDEBox>
    </Flex>
  );
};

export default Console;
