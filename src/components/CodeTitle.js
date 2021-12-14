import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  IconButton,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { setTitle } from "../reducers/codeSlice";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();
  if (isEditing) {
    return (
      <HStack align="center" pl={2} spacing={4}>
        <IconButton
          cursor="pointer"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          cursor="pointer"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </HStack>
    );
  } else {
    return (
      <Flex align="center" pl={2}>
        <IconButton
          cursor="pointer"
          icon={<FaPen />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }
};

const CodeTitle = () => {
  const title = useSelector((state) => state.code.title);
  const dispatch = useDispatch();
  const onSubmit = (newTitle) => {
    dispatch(setTitle(newTitle));
  };
  return (
    <Flex justify="space-between">
      <Editable defaultValue={title} display="flex" onSubmit={onSubmit}>
        <EditablePreview
          alignItems="center"
          overflow="hidden"
          display="flex"
          flexWrap="nowrap"
          maxW="150px"
        />
        <EditableInput maxW="150px" />
        <EditableControls />
      </Editable>
    </Flex>
  );
};

export default CodeTitle;
