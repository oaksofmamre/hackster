import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import "./semantic/dist/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
