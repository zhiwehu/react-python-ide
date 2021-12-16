import skulpt from "skulpt";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, Stack, VStack } from "@chakra-ui/react";

import Header from "./modules/Header";
import {
  setCurrentFile,
  getCurrentDateTime,
  setOutput,
} from "./reducers/pythonFileListSlice";
import CodeArea from "./modules/CodeArea";
import Turtle from "./modules/Turtle";
import Console from "./modules/Console";
import { termInput } from "./components/XTerminal";

const App = () => {
  const editorRef = useRef(null);
  const turtleCanvas = useRef(null);
  const terminalRef = useRef(null);
  const codeFullSize = useSelector((state) => state.settings.codeFullSize);

  const dispatch = useDispatch();

  const readf = (x) => {
    if (
      skulpt.builtinFiles === undefined ||
      skulpt.builtinFiles["files"][x] === undefined
    ) {
      throw x;
    }
    return skulpt.builtinFiles["files"][x];
  };

  const handleRunCode = () => {
    let result = "";
    dispatch(setOutput(result));
    let code = editorRef.current.editor.getValue();
    dispatch(
      setCurrentFile({
        id: null,
        code: code,
        datetime: getCurrentDateTime(),
      })
    );
    //skulpt.pre = "output";
    skulpt.configure({
      inputfun: termInput,
      inputfunTakesPrompt: true,
      output: (text) => {
        if (text.trim().length > 0) {
          result += "\r" + text;
        }
      },
      read: readf,
    });

    (skulpt.TurtleGraphics || (skulpt.TurtleGraphics = {})).target =
      "turtlecanvas";
    skulpt.TurtleGraphics.width = turtleCanvas.current.offsetWidth;
    skulpt.TurtleGraphics.height = turtleCanvas.current.offsetHeight;

    const myPromise = skulpt.misceval.asyncToPromise(function () {
      if (code === "") code = "from turtle import *";
      return skulpt.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(
      function (mod) {
        if (result !== "") dispatch(setOutput("\n\x1b[1;0m" + result));
        console.log("success");
      },
      function (err) {
        dispatch(setOutput("\x1b[1;31m" + err.toString()));
        console.log(err.toString());
      }
    );
  };

  return (
    <Box
      w="100%"
      h="100vh"
      overflowX="hidden"
      overflowY={{ base: "auto", lg: "hidden" }}
    >
      <Flex direction="column" w="full" h="100vh">
        <Header editorRef={editorRef} handleRunCode={handleRunCode} />

        <Stack
          direction={{ base: "column", lg: "row" }}
          w="100%"
          h="100%"
          justify="space-between"
          spacing={{ base: 0, lg: 4 }}
          flexGrow={1}
          px={4}
        >
          <CodeArea editorRef={editorRef} />

          <VStack
            w={{ base: "100%", lg: "32%" }}
            h="100%"
            flexGrow={1}
            display={codeFullSize ? "none" : "flex"}
          >
            <Turtle turtleCanvas={turtleCanvas} />
            <Console terminalRef={terminalRef} />
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default App;
