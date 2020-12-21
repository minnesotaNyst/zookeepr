const path = require('path');
const router = require('express').Router();

// what we want here is for our index.html file to be served from our express.js server
// notice that we don't have an actual name for the path, we use / to route us to the root of the server
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
module.exports = router;
