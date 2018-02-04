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

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: ""
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h2>{title}</h2>
        <form>
          <input
            type="text"
            onChange={this.onSearchChange}
            placeholder=" Search"
          />
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points} </span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                // onClick={() => console.log(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
