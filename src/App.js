import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Icon,
  Stack,
  HStack,
  VStack,
  Spacer,
  Text,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  useColorMode,
} from "@chakra-ui/react";
import { FaPython, FaPen, FaUndo, FaRedo, FaPlay } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Editor from "./components/Editor";
import IDEBox from "./components/IDEBox";
import {
  toggleCodeSize,
  toggleCanvasSize,
  toggleConsoleSize,
} from "./reducers/IDEWindowSizeSlice";
import { setResult } from "./reducers/codeSlice";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <HStack align="center" px={4} spacing={4}>
      <Icon cursor="pointer" as={CheckIcon} {...getSubmitButtonProps()} />
      <Icon cursor="pointer" as={CloseIcon} {...getCancelButtonProps()} />
    </HStack>
  ) : (
    <Flex align="center" px={4}>
      <Icon cursor="pointer" as={FaPen} {...getEditButtonProps()} />
    </Flex>
  );
}

async function load() {
  let pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/",
  });
  return pyodide;
}

let pyodideReadyPromise = load();

const App = () => {
  async function runPython(pycode) {
    let pyodide = await pyodideReadyPromise;
    let result = await pyodide.runPythonAsync(pycode);
    dispatch(setResult(result));
    return result;
  }
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
            <Icon fontSize={50} as={FaPython} />
          </Flex>

          <HStack spacing={4}>
            <Flex>
              <Editable defaultValue="unnamed" display="flex">
                <EditablePreview />
                <EditableInput />
                <EditableControls />
              </Editable>
            </Flex>

            <Icon cursor="pointer" fontSize={20} as={FaUndo} />
            <Icon cursor="pointer" fontSize={20} as={FaRedo} />
            <Icon
              cursor="pointer"
              fontSize={20}
              as={FaPlay}
              onClick={() => runPython(code)}
            />
          </HStack>
          <Flex
            px={4}
            pt={{ base: 0, lg: 6 }}
            position="absolute"
            right={0}
            top={0}
            align="center"
            justify="center"
          >
            <Icon
              cursor="pointer"
              fontSize={20}
              onClick={toggleColorMode}
              as={colorMode === "light" ? SunIcon : MoonIcon}
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
              <Editor />
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
                <Text></Text>
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
