import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = "javascript";
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
    title: "Yarn – A new package manager for JavaScript",
    url: "https://code.facebook.com/posts/1840075619545360",
    author: "cpojer",
    num_comments: 469,
    points: 1714,
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
      <div id="main-container" class="ui raised segment container">
        <h2 className="ui header">
          <img src="./images/logo.png" class="ui circular image" alt="logo" />
          {title}
        </h2>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          children="Search"
        />
        {error ? (
          <div>
            <p>Opps, something went wrong ...</p>
          </div>
        ) : (
          result && <Table list={result.hits} onDismiss={this.onDismiss} />
        )}
        <Button
          className="ui button orange mini"
          onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
        >
          More
        </Button>
      </div>
    );
  }
}

const Search = ({ value, onChange, onSubmit, children = "" }) => (
  <form class="ui form tiny" onSubmit={onSubmit}>
    <div className="ui grid">
      <div id="search-box-area" class="five column row">
        <div class="column">
          <input
            type="text"
            value={value}
            placeholder="Type in your search"
            onChange={onChange}
          />
        </div>
        <div id="search-area" class="column">
          <button class="ui button tiny basic orange" type="submit">
            {children}
          </button>
        </div>
      </div>
    </div>
  </form>
);

const Table = ({ list, onDismiss }) => (
  <div>
    {/* DC: filter out blank stories here */}
    {list.map(item => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>
          {" "}
          by <u>{item.author}</u>
        </span>
        <span>
          {" "}
          with <u>{item.num_comments} comments</u>{" "}
        </span>
        <span>
          {" "}
          and <u>{item.points} points</u>
        </span>
        <span>
          <TrashButton onClick={() => onDismiss(item.objectID)}>
            Dismiss
          </TrashButton>
          {/* open up browser's console to see the different outcomes */}
          {/* <Button onClick={console.log(item.objectID)}>Dismiss</Button> */}
          {/* <Button onClick={() => console.log(item.objectID)}> Dismiss </Button> */}
        </span>
      </div>
    ))}
  </div>
);

const TrashButton = ({ onClick, className = "", children }) => (
  <div class="trash-button ui mini basic icon buttons">
    <button onClick={onClick} class="ui icon button">
      <i class="trash icon" />
    </button>
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button
    id="more-button"
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>
);

export default App;
