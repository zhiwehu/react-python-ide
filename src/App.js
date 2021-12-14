import { useRef } from "react";
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
  Text,
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
import { setResult } from "./reducers/codeSlice";

let pyodideReadyPromise = null;

async function load() {
  if (pyodideReadyPromise == null) {
    let pyodide = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
    });
    return pyodide;
  }
}

pyodideReadyPromise = load();

const App = () => {
  const runPython = async (pycode) => {
    let pyodide = await pyodideReadyPromise;
    let result = await pyodide.runPythonAsync(pycode);
    dispatch(setResult(result));
    return result;
  };

  const editorRef = useRef(null);

  const { colorMode, toggleColorMode } = useColorMode();
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );
  const code = useSelector((state) => state.code.code);
  const result = useSelector((state) => state.code.result);

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
              color={colorMode === "light" ? "darkcyan" : "white"}
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
            <IconButton icon={<FaPlay />} onClick={() => runPython(code)} />
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
          <Flex h="100%" flexGrow={2} display={codeDisplay}>
            <IDEBox
              title="Code"
              toggleFullSize={() => dispatch(toggleCodeSize())}
              fullSize={codeFullSize}
            >
              <Editor editorRef={editorRef} />
            </IDEBox>
          </Flex>

          <VStack
            h="100%"
            spacing={4}
            flexGrow={1}
            display={codeFullSize ? "none" : "flex"}
          >
            <Flex w="100%" flexGrow={1} display={canvasDisplay}>
              <IDEBox
                title="Canvas"
                toggleFullSize={() => dispatch(toggleCanvasSize())}
                fullSize={canvasFullSize}
              >
                <Box w="100%" h="100%"></Box>
              </IDEBox>
            </Flex>
            <Flex w="100%" flexGrow={1} display={consoleDisplay}>
              <IDEBox
                title="Console"
                toggleFullSize={() => dispatch(toggleConsoleSize())}
                fullSize={consoleFullSize}
              >
                <Text>{result}</Text>
              </IDEBox>
            </Flex>
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

export default App;
