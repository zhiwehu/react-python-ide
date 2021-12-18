import {
  Flex,
  IconButton,
  Stack,
  Spacer,
  Badge,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import MenuButtons from "../components/MenuButtons";
import CodeTitle from "../components/CodeTitle";
import { ReactComponent as PythonIcon } from "../icons-python.svg";

const Header = ({ editorRef, handleRunCode }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      px={4}
      mb={2}
      spacing={4}
      borderBottom="1px lightgreen dashed"
    >
      <Flex>
        <PythonIcon width={50} height={50} style={{ paddingRight: "10px" }} />
        <CodeTitle />
      </Flex>
      <MenuButtons editorRef={editorRef} handleRunCode={handleRunCode} />
      <Spacer />
      <HStack
        zIndex={100}
        px={4}
        spacing={2}
        position={{ base: "absolute", lg: "relative" }}
        right={0}
        top={{ base: "-11px", lg: 0 }}
        align="center"
        justify="center"
      >
        <Badge variant="subtle" colorScheme="green">
          beta
        </Badge>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        />
      </HStack>
    </Stack>
  );
};

export default Header;
