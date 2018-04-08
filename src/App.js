import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './App.css';
import axios from 'axios';
import TableUser from './TableUser';

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
const results = [{"sku":43900,"name":"Duracell - AAA Batteries (4-Pack)","type":"HardGood","price":5.49,"upc":"041333424019","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Compatible with select electronic devices; AAA size; DURALOCK Power Preserve technology; 4-pack","manufacturer":"Duracell","model":"MN2400B4Z","url":"http://www.bestbuy.com/site/duracell-aaa-batteries-4-pack/43900.p?id=1051384074145&skuId=43900&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/4390/43900_sa.jpg"},
{"sku":48530,"name":"Duracell - AA 1.5V CopperTop Batteries (4-Pack)","type":"HardGood","price":5.49,"upc":"041333415017","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Long-lasting energy; DURALOCK Power Preserve technology; for toys, clocks, radios, games, remotes, PDAs and more","manufacturer":"Duracell","model":"MN1500B4Z","url":"http://www.bestbuy.com/site/duracell-aa-1-5v-coppertop-batteries-4-pack/48530.p?id=1099385268988&skuId=48530&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/4853/48530_sa.jpg"},
{"sku":127687,"name":"Duracell - AA Batteries (8-Pack)","type":"HardGood","price":7.49,"upc":"041333825014","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Compatible with select electronic devices; AA size; DURALOCK Power Preserve technology; 8-pack","manufacturer":"Duracell","model":"MN1500B8Z","url":"http://www.bestbuy.com/site/duracell-aa-batteries-8-pack/127687.p?id=1051384045676&skuId=127687&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/1276/127687_sa.jpg"},
{"sku":150115,"name":"Energizer - MAX Batteries AA (4-Pack)","type":"HardGood","price":4.99,"upc":"039800011329","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"4-pack AA alkaline batteries; battery tester included","manufacturer":"Energizer","model":"E91BP-4","url":"http://www.bestbuy.com/site/energizer-max-batteries-aa-4-pack/150115.p?id=1051384046217&skuId=150115&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/1501/150115_sa.jpg"},
{"sku":185230,"name":"Duracell - C Batteries (4-Pack)","type":"HardGood","price":8.99,"upc":"041333440019","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Compatible with select electronic devices; C size; DURALOCK Power Preserve technology; 4-pack","manufacturer":"Duracell","model":"MN1400R4Z","url":"http://www.bestbuy.com/site/duracell-c-batteries-4-pack/185230.p?id=1051384046486&skuId=185230&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/1852/185230_sa.jpg"},
{"sku":185267,"name":"Duracell - D Batteries (4-Pack)","type":"HardGood","price":9.99,"upc":"041333430010","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.99,"description":"Compatible with select electronic devices; D size; DURALOCK Power Preserve technology; 4-pack","manufacturer":"Duracell","model":"MN1300R4Z","url":"http://www.bestbuy.com/site/duracell-d-batteries-4-pack/185267.p?id=1051384046551&skuId=185267&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/1852/185267_sa.jpg"},
{"sku":312290,"name":"Duracell - 9V Batteries (2-Pack)","type":"HardGood","price":7.99,"upc":"041333216010","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208002","name":"Alkaline Batteries"}],"shipping":5.49,"description":"Compatible with select electronic devices; alkaline chemistry; 9V size; DURALOCK Power Preserve technology; 2-pack","manufacturer":"Duracell","model":"MN1604B2Z","url":"http://www.bestbuy.com/site/duracell-9v-batteries-2-pack/312290.p?id=1051384050321&skuId=312290&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3122/312290_sa.jpg"},
{"sku":324884,"name":"Directed Electronics - Viper Audio Glass Break Sensor","type":"HardGood","price":39.99,"upc":"093207005060","category":[{"id":"pcmcat113100050015","name":"Carfi Instore Only"}],"shipping":0,"description":"From our expanded online assortment; compatible with Directed Electronics alarm systems; microphone and microprocessor detect and analyze intrusions; detects quiet glass breaks","manufacturer":"Directed Electronics","model":"506T","url":"http://www.bestbuy.com/site/directed-electronics-viper-audio-glass-break-sensor/324884.p?id=1112808077651&skuId=324884&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3248/324884_rc.jpg"},
{"sku":333179,"name":"Energizer - N Cell E90 Batteries (2-Pack)","type":"HardGood","price":5.99,"upc":"039800013200","category":[{"id":"pcmcat312300050015","name":"Connected Home & Housewares"},{"id":"pcmcat248700050021","name":"Housewares"},{"id":"pcmcat303600050001","name":"Household Batteries"},{"id":"abcat0208006","name":"Specialty Batteries"}],"shipping":5.49,"description":"Alkaline batteries; 1.5V","manufacturer":"Energizer","model":"E90BP-2","url":"http://www.bestbuy.com/site/energizer-n-cell-e90-batteries-2-pack/333179.p?id=1185268509951&skuId=333179&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3331/333179_sa.jpg"},
{"sku":346575,"name":"Metra - Radio Installation Dash Kit for Most 1989-2000 Ford, Lincoln & Mercury Vehicles - Black","type":"HardGood","price":16.99,"upc":"086429002757","category":[{"id":"abcat0300000","name":"Car Electronics & GPS"},{"id":"pcmcat165900050023","name":"Car Installation Parts & Accessories"},{"id":"pcmcat331600050007","name":"Car Audio Installation Parts"},{"id":"pcmcat165900050031","name":"Deck Installation Parts"},{"id":"pcmcat165900050033","name":"Dash Installation Kits"}],"shipping":0,"description":"From our expanded online assortment; compatible with most 1989-2000 Ford, Lincoln and Mercury vehicles; snap-in TurboKit offers fast installation; spacer/trim ring; rear support bracket","manufacturer":"Metra","model":"99-5512","url":"http://www.bestbuy.com/site/metra-radio-installation-dash-kit-for-most-1989-2000-ford-lincoln-mercury-vehicles-black/346575.p?id=1218118704590&skuId=346575&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3465/346575_rc.jpg"},
{"sku":346646,"name":"Metra - Radio Dash Multikit for Select GM Vehicles - Black","type":"HardGood","price":16.99,"upc":"086429003273","category":[{"id":"abcat0300000","name":"Car Electronics & GPS"},{"id":"pcmcat165900050023","name":"Car Installation Parts & Accessories"},{"id":"pcmcat331600050007","name":"Car Audio Installation Parts"},{"id":"pcmcat165900050031","name":"Deck Installation Parts"},{"id":"pcmcat165900050033","name":"Dash Installation Kits"}],"shipping":0,"description":"From our expanded online assortment; compatible with select GM vehicles; plastic material","manufacturer":"Metra","model":"99-4500","url":"http://www.bestbuy.com/site/metra-radio-dash-multikit-for-select-gm-vehicles-black/346646.p?id=1210376657731&skuId=346646CC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3466/346646_rc.jpg"},
{"sku":347137,"name":"Metra - Wiring Harness for Select 1998-2008 Ford Vehicles - Multicolored","type":"HardGood","price":16.99,"upc":"086429056514","category":[{"id":"abcat0300000","name":"Car Electronics & GPS"},{"id":"pcmcat165900050023","name":"Car Installation Parts & Accessories"},{"id":"pcmcat331600050007","name":"Car Audio Installation Parts"},{"id":"pcmcat165900050031","name":"Deck Installation Parts"},{"id":"pcmcat165900050034","name":"Deck Harnesses"}],"shipping":0,"description":"Compatible with select 1998-2008 Ford vehicles; connects an aftermarket radio to a vehicle's harness","manufacturer":"Metra","model":"70-1771","url":"http://www.bestbuy.com/site/metra-wiring-harness-for-select-1998-2008-ford-vehicles-multicolored/347137.p?id=1142290459780&skuId=347137&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/9852/9852688_sa.jpg"},
{"sku":347146,"name":"Metra - Turbo Wire Aftermarket Radio Wire Harness Adapter for Select Vehicles","type":"HardGood","price":16.99,"upc":"086429056507","category":[{"id":"abcat0300000","name":"Car Electronics & GPS"},{"id":"pcmcat165900050023","name":"Car Installation Parts & Accessories"},{"id":"pcmcat331600050007","name":"Car Audio Installation Parts"},{"id":"pcmcat165900050031","name":"Deck Installation Parts"},{"id":"pcmcat165900050034","name":"Deck Harnesses"}],"shipping":0,"description":"Compatible with Honda and Acura vehicles; connects an aftermarket radio to your car's harness","manufacturer":"Metra","model":"70-1721","url":"http://www.bestbuy.com/site/metra-turbo-wire-aftermarket-radio-wire-harness-adapter-for-select-vehicles/347146.p?id=1183160746244&skuId=347146&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3471/347146_rc.jpg"},
{"sku":347155,"name":"Metra - Wiring Harness for Most 1986-1998 Honda Acura Vehicles - Multicolored","type":"HardGood","price":16.99,"upc":"086429002597","category":[{"id":"abcat0300000","name":"Car Electronics & GPS"},{"id":"pcmcat165900050023","name":"Car Installation Parts & Accessories"},{"id":"pcmcat331600050007","name":"Car Audio Installation Parts"},{"id":"pcmcat165900050031","name":"Deck Installation Parts"},{"id":"pcmcat165900050034","name":"Deck Harnesses"}],"shipping":0,"description":"Compatible with most 1986-1998 Honda Acura vehicles; connects an aftermarket radio to a vehicle's harness","manufacturer":"Metra","model":"70-1720","url":"http://www.bestbuy.com/site/metra-wiring-harness-for-most-1986-1998-honda-acura-vehicles-multicolored/347155.p?id=1142292396747&skuId=347155&cmp=RMXCC","image":"http://img.bbystatic.com/BestBuy_US/images/products/3471/347155_rc.jpg"}
  ,{
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
  return results.filter(result => result.name);
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
        <h1>{`/r/${this.state.value}`}</h1>
        <ul>
          {this.state.suggestions.map(value =>
            <li key={suggestions.name}>{suggestions.name}</li>
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
