import { Box, Icon, HStack, VStack, Text } from "@chakra-ui/react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

const IDEBox = ({ title = "", children, toggleFullSize, fullSize = false }) => {
  return (
    <VStack w="100%" h="100%">
      <HStack w="100%" justify="space-between">
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
      <Box w="100%" h="100%" bg="gray">
        {children}
      </Box>
    </VStack>
  );
};

export default IDEBox;
