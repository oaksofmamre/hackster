import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Hackster, { Search, Button } from "./containers/Hackster/Hackster";
import renderer from "react-test-renderer";

describe("App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has valid snapshot", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
  });
  test("has valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Button</Button>, div);
  });
  test("has valid snapshot", () => {
    const component = renderer.create(<Button>Button</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
