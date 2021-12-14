import { useDispatch } from "react-redux";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { setCode } from "../reducers/codeSlice";

const Editor = ({ editorRef }) => {
  const dispatch = useDispatch();
  const onChange = (newValue) => {
    dispatch(setCode(newValue));
  };
  let demoCode = `from turtle import *
  from math import *
  from random import *
  
  for i in range(10):
      print("#{}. Hello World".format(i))
  
  speed(0)
  seth(90)
  colormode(255)
  up()
  goto(0, -200)
  down()
  
  def square(s, a, n):
      if n==0:
          return
      down()
      color(randint(0, 255), randint(0, 255), randint(0, 255))
      begin_fill()
      for i in range(4):
          fd(s)
          rt(90)
      end_fill()    
      up()
      fd(s)
      lt(a)
      
      square(s*cos(radians(a)), a, n-1)
          
      rt(90)
      fd(s*cos(radians(a)))
      
      square(s*sin(radians(a)), a, n-1)
      
      bk(s*cos(radians(a)))
      lt(90-a)
      bk(s) 
  
  square(100, 36, 5)
  `;
  return (
    <AceEditor
      ref={editorRef}
      defaultValue={demoCode}
      fontSize="20px"
      width="100%"
      height="100%"
      mode="python"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      onLoad={(editor) => {
        editor.once("change", () => {
          editor.session.getUndoManager().reset();
        });
      }}
    />
  );
};

export default Editor;
