import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';
import {DebounceInput} from 'react-debounce-input';

 // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Elm2',
    year: 2012
  },  {
      name: 'Elm3',
      year: 2012
    },  {
        name: 'Elm4',
        year: 2012
      },
];

function getSuggestions(value) {
  const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function storeInputReference(autosuggest) {
  if (autosuggest !== null) {
    this.input = autosuggest.input;
  }
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
// Teach Autosuggest how to calculate suggestions for any given input value.
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;
//
//   // return inputLength === 0 ? [] : languages.filter(lang =>
//   //   lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   // );
//   return console.log(inputValue);
//
// };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
// const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//   <div>
//     {suggestion.name}
//   </div>
// );



class App extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  componentDidMount() {
      console.log('I was triggered during componentDidMount')
    }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    console.log(this.state.value);

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a product name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        ref={storeInputReference}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default App;
