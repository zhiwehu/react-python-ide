import {
  Flex,
  Icon,
  HStack,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  BsFullscreen,
  BsFullscreenExit,
  BsZoomIn,
  BsZoomOut,
  BsEye,
  BsEyeSlash,
} from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
const IDEBox = ({
  title = "",
  children,
  toggleFullSize,
  toggleShowHide,
  fullSize = false,
  show = true,
  editorRef = null,
  titleIcon,
  clearConsole = null,
  setFZ = null,
}) => {
  const { colorMode } = useColorMode();
  return (
    <VStack w="100%" h="100%">
      <HStack
        borderRadius="lg"
        p={2}
        w="100%"
        bg={colorMode === "light" ? "lightgreen" : "darkgreen"}
        justify="space-between"
      >
        <Flex align="center">
          <Icon fontSize="1.5em" as={titleIcon} pr={2} />
          <Text>{title}</Text>
        </Flex>
        <HStack spacing={4}>
          {editorRef && (
            <>
              <Icon
                cursor="pointer"
                fontSize={20}
                as={BsZoomIn}
                onClick={() => {
                  let fz = parseInt(editorRef.current.editor.getFontSize());
                  fz += 1;
                  if (fz > 80) fz = 80;
                  setFZ(fz);
                  editorRef.current.editor.setFontSize(fz);
                }}
              />
              <Icon
                cursor="pointer"
                fontSize={20}
                as={BsZoomOut}
                onClick={() => {
                  let fz = parseInt(editorRef.current.editor.getFontSize());
                  fz -= 1;
                  if (fz < 12) fz = 12;
                  setFZ(fz);
                  editorRef.current.editor.setFontSize(fz);
                }}
              />
            </>
          )}
          {!editorRef && (
            <Icon
              cursor="pointer"
              fontSize={20}
              as={show ? BsEye : BsEyeSlash}
              onClick={toggleShowHide}
            />
          )}
          {title === "Console" && (
            <Icon
              cursor="pointer"
              fontSize={20}
              as={AiOutlineClear}
              onClick={clearConsole}
            />
          )}

          <Icon
            cursor="pointer"
            fontSize={20}
            as={fullSize ? BsFullscreenExit : BsFullscreen}
            onClick={toggleFullSize}
          />
        </HStack>
      </HStack>
      <Flex
        border="1px dashed lightgreen"
        display={show ? "flex" : "none"}
        w="100%"
        h="100%"
      >
        {children}
      </Flex>
    </VStack>
  );
};

export default IDEBox;
