import React from "react";

const button = props => (
  <button
    id="more-button"
    onClick={props.onClick}
    className={props.className}
    type="button"
  >
    {props.children}
  </button>
);

export default button;
