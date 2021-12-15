import { useSelector, useDispatch } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import { GiTurtle } from "react-icons/gi";

import IDEBox from "../components/IDEBox";
import { toggleCanvasSize } from "../reducers/IDEWindowSizeSlice";

const Turtle = ({ turtleCanvas }) => {
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );

  const dispatch = useDispatch();

  let canvasDisplay = "flex";
  if (codeFullSize || consoleFullSize) {
    canvasDisplay = "none";
  }
  return (
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
        <Box w="100%" h="100%" ref={turtleCanvas} id="turtlecanvas"></Box>
      </IDEBox>
    </Flex>
  );
};

export default Turtle;
