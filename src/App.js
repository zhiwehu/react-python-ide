import { useRef, useEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Stack,
  VStack,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { FaPython } from "react-icons/fa";
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
import { setCode } from "./reducers/codeSlice";
import skulpt from "skulpt";
import "xterm/css/xterm.css";

const term = new Terminal();
const fitAddon = new FitAddon();

const App = () => {
  const editorRef = useRef(null);
  const turtleCanvas = useRef(null);

  const { colorMode, toggleColorMode } = useColorMode();
  term.setOption("theme", {
    foreground: colorMode === "light" ? "black" : "white",
    background: colorMode === "light" ? "white" : "#1b202b",
  });
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );

  useEffect(() => {
    term.loadAddon(fitAddon);
    term.open(document.getElementById("xterm"));
    fitAddon.fit();
  }, []);

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
    let code = editorRef.current.editor.getValue();

    dispatch(setCode(code));
    term.reset();
    let result = "";
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
        term.write(result.trim());
        console.log("success");
      },
      function (err) {
        term.write("\x1b[1;31m" + err.toString());
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
          my={2}
          spacing={4}
          borderBottom="1px lightgreen dashed"
        >
          <Flex zIndex={100}>
            <Icon
              pr={4}
              color={colorMode === "light" ? "lightgreen" : "darkgreen"}
              fontSize={50}
              as={FaPython}
            />
            <CodeTitle />
          </Flex>
          <Divider
            orientation="vertical"
            display={{ base: "none", lg: "flex" }}
          />
          <MenuButtons editorRef={editorRef} handleRunCode={handleRunCode} />
          <Spacer />
          <Flex
            px={4}
            position={{ base: "absolute", lg: "relative" }}
            right={0}
            top="-2px"
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
                <Box width="100%" height="100%" id="xterm"></Box>
              </IDEBox>
            </Flex>
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default App;
