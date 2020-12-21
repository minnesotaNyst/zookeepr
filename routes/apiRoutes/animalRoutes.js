// we need to import the functions that we have moved into the lib/animals.js
// the const here is an object of the functions that is equal to the require path where they are located
const {
	filterByQuery,
	findById,
	createNewAnimal,
	validateAnimal
} = require('../../lib/animals');
//  but we also need to import the animals object that's in data/animals.json
const { animals } = require('../../data/animals');

// we cannot use app any longer, because it's defined in the server.js file and cannot be accessed here. Instead, we'll use Router, which allows you to declare routes in any file as long as you use the proper middleware. We'll start by adding the following code to the top of animalRoutes.js to start an instance of Router:
const router = require('express').Router();

router.get('/animals', (req, res) => {
	let results = animals;
	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	res.json(results);
});

// a param route (anything with :<parameter> ) must come after the other GET routes ^^
router.get('/animals/:id', (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

// this sets up a route on our server that accepts data to be used or stored server side
// notice the post request...this represents the action of a client requesting the server to accept data rather than vice versa
router.post('/animals', (req, res) => {
	// set id based on what the next index of the array will be
	req.body.id = animals.length.toString();

	// if any data in req.body is incorrect, send 400 error back
	if (!validateAnimal(req.body)) {
		res.status(400).send('The animal is not properly formatted.');
	} else {
		const animal = createNewAnimal(req.body, animals);
		res.json(animal);
	}
});

module.exports = router;
