import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <ColorModeScript />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
