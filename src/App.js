import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

const title = "Hackster";

const list = [
  {
    title: "Build Yourself a Redux",
    url: "https://zapier.com/engineering/how-to-build-redux/",
    author: "jdeal",
    num_comments: 111,
    points: 111,
    objectID: 0
  },
  {
    title: "Mern: Build JavaScript apps using React and Redux",
    url: "http://mern.io/",
    author: "sinkensabe",
    num_comments: 222,
    points: 222,
    objectID: 1
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>{title}</h2>
        {list.map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
