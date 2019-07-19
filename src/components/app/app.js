import React, { Component } from 'react';
import PeoplePage from '../people-page/index.js';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator/index.js';
import ItemList from '../item-list/index.js';
import PersonDetails from '../person-details/index.js';
import SwapiService from '../../services/swapi-services.js';

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  componentDidCatch() {
    this.setState({hasError: true});
  }

  render() {

    if (this.state.hasError){
      return <ErrorIndicator/>
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

    return (
      <div className="stardb-app">
        <Header />
        { planet }
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <PeoplePage/>
        
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData = {this.swapiService.getAllPlanets} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData = {this.swapiService.getAllStarships} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

      </div>
    );
  };
};
