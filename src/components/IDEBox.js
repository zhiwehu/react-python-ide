import {
  Box,
  Flex,
  Icon,
  HStack,
  VStack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

const IDEBox = ({ title = "", children, toggleFullSize, fullSize = false }) => {
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
        <Box>
          <Text>{title}</Text>
        </Box>
        <HStack>
          <Icon
            fontSize={20}
            as={fullSize ? BsFullscreenExit : BsFullscreen}
            onClick={toggleFullSize}
          />
          <Text>{fullSize}</Text>
        </HStack>
      </HStack>
      <Flex w="100%" h="100%">
        {children}
      </Flex>
    </VStack>
  );
};

export default IDEBox;
