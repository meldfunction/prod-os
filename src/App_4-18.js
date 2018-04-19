import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';
import axios from 'axios';
import TableUser from './TableUser';
import data from './products.json';

// import Apicall from './Apicall';

//import DATA from './products.json';

 // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
 const BigQuery = require('@google-cloud/bigquery');
 const projectId = "prod-os";
 const datasetId = "products";
 const PRODUCT_LOOKUP_API =
   "https://us-central1-prod-os.cloudfunctions.net/function-1?keyword=";

 const bigquery = new BigQuery({
   projectId: projectId,
 });

 const sqlQuery = `
 SELECT
  name
 FROM
  products.current
 WHERE
  LOWER(name) ('apple')`;
  //${sqlQuery}
let holdQ = 'test';

const loadSuggestions = value => {
  setTimeout(() => {
    if (value === app.state.value) {
      app.setState({
        suggestions: getSuggestions(value)
      });
    }
  }, 100);
};
//
// function query (sqlQuery) {
//   bigquery.query(sqlQuery).then(function(data) {
//   var rows = data[0];
//   console.log(rows);
//    res.send(rows);
//
// }).catch(err => {
//   console.error('ERROR:', err);
//   });;
// }
// function escapeRegexCharacters(str) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

function getSuggestions(value) {
  // const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // if (escapedValue === '') {
  //   return [];
  // }
  //
  // const regex = new RegExp('^' + escapedValue, 'i');
  return data.filter(data => data.name);
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
      inputValue: "",
      suggestions: [],
      autocompleteData: []
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  storeInputReference = autosuggest => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  _handleTextChange = inputValue => {
    const request = {
      prefix: inputValue
    };

      axios.post(PRODUCT_LOOKUP_API, request).then((response, error) => {
         //console.log(response.data);
         this.setState({ autocompleteData: response.data });
       });
       this.setState({ inputValue });
       //console.log(inputValue)
  };


  // getCF(){
  //   axios.get(`https://us-central1-prod-os.cloudfunctions.net/function-1?keyword=${this.state.value}`, {timeout: 5000})
  //   .then(res => {
  //     console.log(this.state.suggestions);
  //     console.log(this.state.value);
  //     console.log(res);
  //     const results = res.data.items;
  //     this.setState({results});
  //   }).catch(err => console.log(err))};
      //
      // const results = res.data.children.map(obj => obj.data);
      // this.setState({results});


  // getCF_working(){
  //   axios.get(`https://www.reddit.com/r/${this.state.suggestions}.json`, {timeout: 1000})
  //   .then(res => {
  //     const results = res.data.data.children.map(obj => obj.data);
  //     this.setState({results});
  //   });};
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type a product name",
      value,
      onChange: this.onChange
    };
  //   bigquery.query(sqlQuery).then(function(data) {
  //   var rows = data[0];
  //   console.log(rows);
  //    res.send(rows);
  //
  // }).catch(err => {
  //   console.error('ERROR:', err);
  //   });;
    return (

                    <div>
                    <ul>
                            {
                              data.map(function(product){
                                return <li>{product.name} - {product.url}</li>;
                              })
                            }
                            </ul>
                            <hr></hr>
        <h1>{`/r/${this.state.value}`}</h1>
        <ul>
          {this.state.suggestions.map(value =>
            <li key={data.name}>{data.name}</li>
          )}
        </ul>
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        value={this.state.inputValue}
        ref={this.storeInputReference} />

        </div>
    );
  }
}
export default App;
