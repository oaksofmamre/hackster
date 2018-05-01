import React from "react";

const search = props => (
  // const search = ({ value, onChange, onSubmit, children = "" }) => (
  <form className="ui form tiny" onSubmit={props.onSubmit}>
    <div className="ui grid">
      <div id="search-box-area" className="five column row">
        <div className="column">
          <input
            type="text"
            value={props.value}
            placeholder="Type in your search"
            onChange={props.onChange}
          />
        </div>
        <div id="search-area" className="column">
          <button className="ui button tiny basic orange" type="submit">
            {props.children}
          </button>
        </div>
      </div>
    </div>
  </form>
);

export default search;
