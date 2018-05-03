import React, { Component } from "react";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

// import fetch from "isomorphic-fetch";

const TITLE = "hackster";
const DEFAULT_QUERY = "javascript";
const DEFAULT_HITS_PER_PAGE = "10";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HITS_PER_PAGE = "hitsPerPage=";

class Hackster extends Component {
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
      <div id="main-container" className="ui raised segment container">
        <h2 className="ui header">
          <img
            src="./images/logo.png"
            className="ui circular image"
            alt="logo"
          />
          {TITLE}
        </h2>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
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

export default Hackster;
export { Button, Search, Table };
