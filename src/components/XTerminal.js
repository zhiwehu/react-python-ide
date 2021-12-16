import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { Box, useColorMode } from "@chakra-ui/react";

import "xterm/css/xterm.css";

const term = new Terminal();
const fitAddon = new FitAddon();
term.write(">>> ");

let resolveInput;

export const termInput = (prompt) => {
  return new Promise((resolve) => {
    term.focus();
    term.write("\x1b[1;0m\r\n" + prompt + " ");
    resolveInput = resolve;
  });
};

export const clearConsole = () => {
  term.reset();
  term.write(">>> ");
  term.focus();
};

const print = (text) => {
  // we need \r\n as, on xterm: \n just move the cursor down ; \r move it left
  // we also don't care if we duplicate a \r
  text = text.replaceAll("\r", "");
  text = text.replaceAll("\n", "\r\n");
  // no idea why, skulpt is converting my python '\u033' to '\u000033', so let's revert it
  // (it's used in ANSI escape codes for writing in color in the terminal)
  //text = text.replaceAll("\u000033", "\033");
  term.write(text);
  term.write("\r\n\x1b[1;0m>>> ");
};

// Terminal logic
let inputString = "";
//term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m')
term.onData((e) => {
  switch (e) {
    case "\r": // Enter was pressed
      print(e);
      if (resolveInput !== undefined) {
        // if python is waiting for input
        resolveInput(inputString);
        inputString = "";
      }
      break;
    case "\u007F": // Backspace (DEL) was pressed
      if (inputString.length > 0) {
        // Do not delete past what the user written
        term.write("\b \b");
        inputString = inputString.slice(0, -1);
      }
      break;
    default:
      // Tab, Escape, Insert, Suppr, Home, End, PageUp, PageDown or such special key was pressed
      if (e === "\t" || e.startsWith("\u001b")) {
        // In my case, I don't want those to be sent to my python program
        // console.log("Ignoring special input key: " + JSON.stringify(e));
        // TODO: allow the arrows to be used for prompt editing
      } else {
        // Print all other characters
        term.write(e);
        inputString += e;
      }
  }
});

const XTerminal = ({ terminalRef }) => {
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
  });

  useEffect(() => {
    if (output !== "") print(output);
  }, [output]);

  return <Box width="100%" height="100%" id="xterm" ref={terminalRef}></Box>;
};

export default XTerminal;
