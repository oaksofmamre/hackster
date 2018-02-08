import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = "redux";
const DEFAULT_HITS_PER_PAGE = "10";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HITS_PER_PAGE = "hitsPerPage=";

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;
// console.log(url);

const title = "hackster";
/* const list = [
  {
    title: "Build Yourself a Redux",
    url: "https://zapier.com/engineering/how-to-build-redux/",
    author: "jdeal",
    num_comments: 111,
    points: 111,
    objectID: 0
  }
]; */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      error: null
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page: page } });
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HITS_PER_PAGE}${DEFAULT_HITS_PER_PAGE}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result, error } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="ui container">
        <div>
          <h2>{title}</h2>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            children="Search"
          />
        </div>
        {error ? (
          <div>
            <p>Opps, something went wrong ...</p>
          </div>
        ) : (
          result && <Table list={result.hits} onDismiss={this.onDismiss} />
        )}
        <Button
          onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
        >
          More
        </Button>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children = "" }) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      placeholder="Type in your search"
      onChange={onChange}
    />
    <button type="submit">{children}</button>
  </form>
);

const Table = ({ list, onDismiss }) => (
  <div>
    {list.map(item => (
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
