import React, { Component } from "react";
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
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <h2>{title}</h2>
        <Search value={searchTerm} onChange={this.onSearchChange} />
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input
          type="text"
          value={value}
          // placeholder="Type in your search"
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points} </span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>Dismiss</Button>
              {/* open up browser's console to see the different effects */}
              {/* <Button onClick={console.log(item.objectID)}>Dismiss</Button> */}
              {/* <Button onClick={() => console.log(item.objectID)}> Dismiss </Button> */}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, className, children } = this.props;
    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}

export default App;
