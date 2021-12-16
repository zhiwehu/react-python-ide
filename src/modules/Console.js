import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";
import { VscDebugConsole } from "react-icons/vsc";

import XTerminal, { clearConsole } from "../components/XTerminal";
import IDEBox from "../components/IDEBox";
import {
  toggleConsoleSize,
  toggleShowHideConsole,
} from "../reducers/IDESettingsSlice";
import { setOutput } from "../reducers/pythonFileListSlice";

const Console = ({ terminalRef }) => {
  const codeFullSize = useSelector((state) => state.settings.codeFullSize);
  const canvasFullSize = useSelector((state) => state.settings.canvasFullSize);
  const show = useSelector((state) => state.settings.consoleShow);
  const consoleFullSize = useSelector(
    (state) => state.settings.consoleFullSize
  );

  const clear = () => {
    clearConsole();
    dispatch(setOutput(""));
  };

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
        clearConsole={clear}
      >
        <XTerminal terminalRef={terminalRef} />
      </IDEBox>
    </Flex>
  );
};

export default Console;
