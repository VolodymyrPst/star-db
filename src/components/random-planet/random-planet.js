import React, {Component} from 'react';
import SwapiService from '../../services/swapi-services.js';
import Spiner from '../spiner/index.js'
import ErrorIndicator from '../error-indicator/index.js';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiServices = new SwapiService();

  state = {
    planet: {},
    loading: true,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  };

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false});
  };


  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random()*25)+3;
    this.swapiServices
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

	render() {
    const {planet, loading, error} = this.state;

    const hasDate = !(loading|| error);

    const errorMessage = error ? <ErrorIndicator/> : null ;

    const spiner = loading ? <Spiner/> : null;
    const content = hasDate ? <PlanetVive planet={planet}/> : null;

    return(
			<div className="random-planet jumbotron rounded">
        {errorMessage}
        {spiner}
        {content}        
      </div>
		);
	}
}

const PlanetVive = ({planet}) => {

  const {id, population, rotationPeriod, diameter, name} = planet;

  return (
    <React.Fragment>
      <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  );
}

