import { useRef, useEffect } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Icon,
  Divider,
  IconButton,
  Stack,
  HStack,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { FaPython, FaUndo, FaRedo, FaPlay } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Editor from "./components/Editor";
import IDEBox from "./components/IDEBox";
import CodeTitle from "./components/CodeTitle";
import {
  toggleCodeSize,
  toggleCanvasSize,
  toggleConsoleSize,
} from "./reducers/IDEWindowSizeSlice";
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
  const code = useSelector((state) => state.code.code);

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

  const handleRunCode = (pycode) => {
    term.write("\r");
    term.clear();
    let result = "";
    skulpt.pre = "output";
    skulpt.configure({
      output: (text) => {
        if (text.trim().length > 0) {
          result += "\r" + text;
        }
      },
      read: readf,
    });
    //(skulpt.TurtleGraphics || (skulpt.TurtleGraphics = {})).target = "turtlecanvas";
    skulpt.TurtleGraphics = {};
    skulpt.TurtleGraphics.width = turtleCanvas.current.offsetWidth;
    skulpt.TurtleGraphics.height = turtleCanvas.current.offsetHeight;
    skulpt.TurtleGraphics.target = "turtlecanvas";

    const myPromise = skulpt.misceval.asyncToPromise(function () {
      return skulpt.importMainWithBody("<stdin>", false, pycode, true);
    });
    //term.write("\r\n$ ");
    myPromise.then(
      function (mod) {
        term.write(result.trim());
        console.log("success");
      },
      function (err) {
        console.log(err.toString());
      }
    );
  };

  return (
    <Box w="100%" h="100vh" overflow="hidden">
      <Flex direction="column" w="full" h="100vh">
        <Stack
          direction={{ base: "column", lg: "row" }}
          px={4}
          py={2}
          spacing={4}
          borderBottom="1px solid"
        >
          <Flex pr={4}>
            <Icon
              color={colorMode === "light" ? "lightgreen" : "darkgreen"}
              fontSize={50}
              as={FaPython}
            />
          </Flex>

          <HStack spacing={4}>
            <CodeTitle />
            <Divider orientation="vertical" />
            <IconButton
              icon={
                <FaUndo
                  onClick={() => {
                    editorRef.current.editor.undo();
                  }}
                />
              }
            />
            <IconButton
              icon={<FaRedo />}
              onClick={() => {
                editorRef.current.editor.redo();
              }}
            />
            <IconButton icon={<FaPlay />} onClick={() => handleRunCode(code)} />
          </HStack>
          <Flex
            px={4}
            pt={{ base: 0, lg: 4 }}
            position="absolute"
            right={0}
            top={0}
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
          spacing={4}
          flexGrow={1}
          py={4}
          px={4}
        >
          <Flex h="100%" flexGrow={2} minW="67%" display={codeDisplay}>
            <IDEBox
              title="Code"
              toggleFullSize={() => dispatch(toggleCodeSize())}
              fullSize={codeFullSize}
            >
              <Editor editorRef={editorRef} />
            </IDEBox>
          </Flex>

          <VStack
            w={{ base: "100%", lg: "33%" }}
            h="100%"
            spacing={4}
            flexGrow={1}
            display={codeFullSize ? "none" : "flex"}
          >
            <Flex w="100%" minH="50%" flexGrow={1} display={canvasDisplay}>
              <IDEBox
                title="Canvas"
                toggleFullSize={() => {
                  dispatch(toggleCanvasSize());
                }}
                fullSize={canvasFullSize}
              >
                <Box
                  w="100%"
                  h="100%"
                  ref={turtleCanvas}
                  id="turtlecanvas"
                ></Box>
              </IDEBox>
            </Flex>
            <Flex w="100%" minH="50%" flexGrow={1} display={consoleDisplay}>
              <IDEBox
                title="Console"
                toggleFullSize={() => dispatch(toggleConsoleSize())}
                fullSize={consoleFullSize}
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
