import { useSelector, useDispatch } from "react-redux";
import { Box, Flex } from "@chakra-ui/react";
import { GiTurtle } from "react-icons/gi";

import IDEBox from "../components/IDEBox";
import {
  toggleCanvasSize,
  toggleShowHideCanvas,
} from "../reducers/IDEWindowSizeSlice";

const Turtle = ({ turtleCanvas }) => {
  const codeFullSize = useSelector((state) => state.windowSize.codeFullSize);
  const canvasFullSize = useSelector(
    (state) => state.windowSize.canvasFullSize
  );
  const consoleFullSize = useSelector(
    (state) => state.windowSize.consoleFullSize
  );
  const show = useSelector((state) => state.windowSize.canvasShow);

  const dispatch = useDispatch();

  let canvasDisplay = "flex";
  if (codeFullSize || consoleFullSize) {
    canvasDisplay = "none";
  }
  return (
    <Flex
      id="canvas"
      w="100%"
      minH={show ? "500px" : "0px"}
      flexGrow={show ? 1 : 0}
      display={canvasDisplay}
      ml="0px !important"
      pb={2}
    >
      <IDEBox
        title="Canvas"
        toggleFullSize={() => {
          dispatch(toggleCanvasSize());
        }}
        toggleShowHide={() => {
          dispatch(toggleShowHideCanvas());
        }}
        fullSize={canvasFullSize}
        show={show}
        titleIcon={GiTurtle}
      >
        <Box w="100%" h="100%" ref={turtleCanvas} id="turtlecanvas"></Box>
      </IDEBox>
    </Flex>
  );
};

export default Turtle;
