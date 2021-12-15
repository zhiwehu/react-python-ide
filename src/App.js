import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  VStack,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { BsCode } from "react-icons/bs";
import { VscDebugConsole } from "react-icons/vsc";
import { GiTurtle } from "react-icons/gi";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Editor from "./components/Editor";
import IDEBox from "./components/IDEBox";
import MenuButtons from "./components/MenuButtons";
import {
  toggleCodeSize,
  toggleCanvasSize,
  toggleConsoleSize,
} from "./reducers/IDEWindowSizeSlice";
import CodeTitle from "./components/CodeTitle";
import XTerminal from "./components/XTerminal";
import skulpt from "skulpt";
import { ReactComponent as PythonIcon } from "./icons-python.svg";
import {
  setCurrentFile,
  getCurrentDateTime,
  setOutput,
} from "./reducers/pythonFileListSlice";

const App = () => {
  const editorRef = useRef(null);
  const turtleCanvas = useRef(null);
  const terminalRef = useRef(null);

  const { colorMode, toggleColorMode } = useColorMode();
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );

  const dispatch = useDispatch();

  let codeDisplay = "flex";
  if (canvasFullSize || consoleFullSize) {
    codeDisplay = "none";
  }

  let consoleDisplay = "flex";
  if (canvasFullSize || codeFullSize) {
    consoleDisplay = "none";
  }

  let canvasDisplay = "flex";
  if (codeFullSize || consoleFullSize) {
    canvasDisplay = "none";
  }

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
      output: (text) => {
        if (text.trim().length > 0) {
          result += "\r" + text;
        }
      },
      read: readf,
    });

    skulpt.TurtleGraphics = {};
    skulpt.TurtleGraphics.width = turtleCanvas.current.offsetWidth;
    skulpt.TurtleGraphics.height = turtleCanvas.current.offsetHeight;
    skulpt.TurtleGraphics.target = "turtlecanvas";

    const myPromise = skulpt.misceval.asyncToPromise(function () {
      if (code === "") code = "from turtle import *";
      return skulpt.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(
      function (mod) {
        dispatch(setOutput(result.trim()));
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
        <Stack
          direction={{ base: "column", lg: "row" }}
          px={4}
          mb={2}
          spacing={4}
          borderBottom="1px lightgreen dashed"
        >
          <Flex>
            <PythonIcon
              width={50}
              height={50}
              style={{ paddingRight: "10px" }}
            />
            <CodeTitle editorRef={editorRef} />
          </Flex>
          <MenuButtons editorRef={editorRef} handleRunCode={handleRunCode} />
          <Spacer />
          <Flex
            zIndex={100}
            px={4}
            position={{ base: "absolute", lg: "relative" }}
            right={0}
            top={{ base: "-11px", lg: 0 }}
            align="center"
            justify="center"
          >
            <IconButton
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            />
          </Flex>
        </Stack>

        <Stack
          direction={{ base: "column", lg: "row" }}
          w="100%"
          h="100%"
          justify="space-between"
          spacing={{ base: 0, lg: 4 }}
          flexGrow={1}
          px={4}
        >
          <Flex
            id="code"
            minH="50%"
            h="100%"
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
            >
              <Editor editorRef={editorRef} />
            </IDEBox>
          </Flex>

          <VStack
            w={{ base: "100%", lg: "32%" }}
            h="100%"
            flexGrow={1}
            display={codeFullSize ? "none" : "flex"}
          >
            <Flex
              id="canvas"
              w="100%"
              h={{ base: "70vh", lg: "50%" }}
              minH="50%"
              flexGrow={1}
              display={canvasDisplay}
            >
              <IDEBox
                title="Canvas"
                toggleFullSize={() => {
                  dispatch(toggleCanvasSize());
                }}
                fullSize={canvasFullSize}
                titleIcon={GiTurtle}
              >
                <Box
                  w="100%"
                  h="100%"
                  ref={turtleCanvas}
                  id="turtlecanvas"
                ></Box>
              </IDEBox>
            </Flex>

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
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default App;
