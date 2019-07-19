import React, {Component} from 'react';
import PersonDetails from '../person-details/index.js';
import ItemList from '../item-list/index.js';
import ErrorIndicator from '../error-indicator/index.js';
import SwapiService from '../../services/swapi-services.js';

import './people-page.css';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

	state = {
		selectedPerson:3,
		hasError:false
	};

	componentDidCatch() {
	    this.setState({hasError: true});
	  }


	 onPersonSelected = (selectedPerson) => {
	    this.setState({
	      selectedPerson
	    });
	  };

	render() {

		if (this.state.hasError) {
			return <ErrorIndicator/>
		}

		return (
			<div className="row mb2">
	          <div className="col-md-6">
	            <ItemList 
	            	onItemSelected={this.onPersonSelected}
	            	getData = {this.swapiService.getAllPeople} />
	          </div>
	          <div className="col-md-6">
	            <PersonDetails personId={this.state.selectedPerson} />
	          </div>
	        </div>
		);
	};
};