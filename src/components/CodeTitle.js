import { useSelector, useDispatch } from "react-redux";
import { Text, Input, IconButton, HStack } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { setCurrentFile } from "../reducers/pythonFileListSlice";
import { useState, useEffect } from "react";

const CodeTitle = () => {
  const dispatch = useDispatch();
  const currentFile = useSelector((state) => state.code.currentFile);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(
    currentFile !== null ? currentFile.title : "unnamed"
  );
  useEffect(() => {
    setTitle(currentFile !== null ? currentFile.title : "unnamed");
  }, [currentFile]);

  return (
    <HStack spacing={2} align="center" justify="space-between">
      <Text
        display={editing ? "none" : "flex"}
        onClick={() => setEditing(true)}
        style={{ maxWidth: "150px" }}
        overflow="hidden"
      >
        {title}
      </Text>
      <Input
        display={editing ? "flex" : "none"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {editing === true ? (
        <>
          <IconButton
            cursor="pointer"
            icon={<CheckIcon />}
            onClick={() => {
              dispatch(setCurrentFile({ ...currentFile, title: title }));
              setEditing(false);
            }}
          />
          <IconButton
            cursor="pointer"
            icon={<CloseIcon />}
            onClick={() => {
              setTitle(currentFile !== null ? currentFile.title : "unnamed");
              setEditing(false);
            }}
          />
        </>
      ) : (
        <IconButton
          cursor="pointer"
          icon={<FaPen />}
          onClick={() => setEditing(true)}
        />
      )}
    </HStack>
  );
};

export default CodeTitle;
