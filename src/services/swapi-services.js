export default class SwapiService {

	_apiBase = 'https://swapi.co/api';

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);
		// if resp not 200 throw err
		if(!res.ok) {
			throw new Error(`Could not fetch ${url}`+
				`, received ${res.status}`)
		}
		return await res.json();
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results;
	}

	getPerson(id) {
		return this.getResource(`/people/${id}/`);
	}

	async getAllPlanets() {
		const res = await this.getResource(`/planets/`);
		return res.results;
	}

	getPlanet(id) {
		return this.getResource(`/planets/${id}/`);
	}

	async getAllStarships() {
		const res = await this.getResource(`/Starships/`);
		return res.results;
	}

	getStarship(id) {
		return this.getResource(`/Starships/${id}/`);
	}
}





//ask peoples

const swapi = new SwapiService();

swapi.getAllPeople().then(people => {
	people.forEach((p)=>{
		console.log(p.name);
	})
});




//ask one id people

const swapis = new SwapiService();

swapis.getPerson(3).then(person => {

		console.log(person.name);
	
});












// //async 
// const getResource = async (url) => {
// 	const res = await fetch(url);
// 	// if resp not 200 throw err
// 	if(!res.ok) {
// 		throw new Error(`Could not fetch ${url}`+`, received ${res.status}`)
// 	}

// 	const body = await res.json();
// };


// getResource("https://swapi.co/api/people/sfaa1/")
// 	.then(body => {
// 		console.log(body);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})



// fetch ("https://swapi.co/api/people/1/")
// 	.then( res => {
// 		return res.json();
// 	})
// 	.then(body => {
// 		console.log(body);
// 	});