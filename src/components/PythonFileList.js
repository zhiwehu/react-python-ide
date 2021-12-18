import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  DrawerCloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  SimpleGrid,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import PythonFile from "./PythonFile";

const PythonFileList = ({ onClose, isOpen }) => {
  const ITEM_PER_PAGE = 5;
  const files = useSelector((state) => state.code.files);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(
    Math.ceil(files.length / ITEM_PER_PAGE)
  );
  const [search, setSearch] = useState("");
  const [filterFiles, setFilterFiles] = useState(
    files.slice(0, page * ITEM_PER_PAGE)
  );

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let data = files;
    if (search !== "") {
      data = files.filter((file) => {
        return file.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
      });
      setPage(1);
      setTotalPage(Math.ceil(data.length / ITEM_PER_PAGE));
    } else {
      data = files;
      setTotalPage(Math.ceil(files.length / ITEM_PER_PAGE));
    }
    data = data.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE);
    setFilterFiles(data);
  }, [search, page, totalPage, files]);

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Text>Files</Text>
        </DrawerHeader>
        <DrawerBody p={0}>
          <Box p={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input onChange={onChange} value={search} />
            </InputGroup>
          </Box>
          <SimpleGrid column={1} spacing={4}>
            {filterFiles.map((file) => (
              <PythonFile key={file.id} file={file} onClose={onClose} />
            ))}
          </SimpleGrid>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <IconButton
            variant="outline"
            colorScheme="green"
            icon={<ChevronLeftIcon />}
            onClick={previousPage}
            isDisabled={page === 1}
          />
          <Spacer />
          <Text>
            {page} / {totalPage}
          </Text>
          <Spacer />
          <IconButton
            variant="outline"
            colorScheme="green"
            icon={<ChevronRightIcon />}
            onClick={nextPage}
            isDisabled={page === totalPage}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PythonFileList;
