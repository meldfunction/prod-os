import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';
import axios from 'axios';
import TableUser from './TableUser';
//import data from './products copy.json';

const PRODUCT_LOOKUP_API =
   "https://us-central1-prod-os.cloudfunctions.net/function-1?keyword=";

function getMatchingData(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  axios.get(PRODUCT_LOOKUP_API+value, value).then((response, error) => {
           //console.log(response);
           this.setState({ _this: response.data });
         }).catch( (error) => {
    console.log(error);
  });
return ""
  // return autocompleteData.filter(autocompleteData => regex.test(autocompleteData.name)).bind(this);
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function randomDelay() {
  return 300 + Math.random() * 1000;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      autocompleteData: [],
      isLoading: false
    };
  }

  loadSuggestions(value) {
    this.setState({
      isLoading: true
    });

    // Fake an AJAX call
    setTimeout(() => {
      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions: getMatchingData(value)
        });
      } else {
        // Ignore suggestions if input value has changed
        /*this.setState({
          isLoading: false
        });*/
      }
    }, 200/*randomDelay()*/);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, autocompleteData, isLoading } = this.state;
    const inputProps = {
      placeholder: "Type 'iPhone'",
      value,
      onChange: this.onChange
    };
    const status = (isLoading ? 'Loading...' : 'Type to load suggestions');

    return (

      <div>
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <Autosuggest
          suggestions={suggestions}
          autocompleteData={autocompleteData}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        </div>
    );
  }
}
export default App;
