import React from "react";

const trashButton = props => (
  <div className="trash-button ui mini basic icon buttons">
    <button onClick={props.onClick} className="ui icon button">
      <i className="trash icon" />
    </button>
  </div>
);

export default trashButton;
