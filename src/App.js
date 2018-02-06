import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

const title = "Hackster";
/* const list = [
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
]; */

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
// const isSearched = searchTerm => {
//   if (!searchTerm) {
//     return item => item.title;
//   } else {
//     return item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    //DC: filter takes a function. returns boolean. if true, then adds item to new array, else does not
    //DC: setting state triggers render
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      // result: Object.assign({}, this.state.result, { hits: updatedHits })
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;

    //API call is async, thus
    //if the data hasn't yet come back from API, then simply return null
    // if (!result) {
    //   return null;
    // }

    return (
      <div className="App">
        <div>
          <h2>{title}</h2>
          <Search value={searchTerm} onChange={this.onSearchChange} />
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}

const Search = ({ value, onChange, children = "" }) => (
  <form>
    {children}
    <input
      type="text"
      value={value}
      placeholder="Type in your search"
      onChange={onChange}
    />
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
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
          {/* open up browser's console to see the different outcomes */}
          {/* <Button onClick={console.log(item.objectID)}>Dismiss</Button> */}
          {/* <Button onClick={() => console.log(item.objectID)}> Dismiss </Button> */}
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
