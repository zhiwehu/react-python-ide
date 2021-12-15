import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Box, useColorMode } from "@chakra-ui/react";

import "xterm/css/xterm.css";

const XTerminal = ({ terminalRef }) => {
  const term = new Terminal();
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  const { colorMode } = useColorMode();
  const output = useSelector((state) => state.code.output);

  useEffect(() => {
    term.setOption("theme", {
      foreground: colorMode === "light" ? "black" : "white",
      background: colorMode === "light" ? "white" : "#1b202b",
    });

    if (terminalRef.current.children.length > 0)
      terminalRef.current.removeChild(terminalRef.current.children[0]);
    term.open(terminalRef.current);
    fitAddon.fit();
    term.reset();
    if (output !== "") {
      term.write(output);
    }
  });

  return <Box width="100%" height="100%" id="xterm" ref={terminalRef}></Box>;
};

export default XTerminal;
