// *This file should be in charge of starting our server and should be located in the root of the repository

const express = require('express');
const { animals } = require('./data/animals');
const fs = require('fs');
const path = require('path');

// The require() statements will read the index.js files in each of the directories indicated. This mechanism works the same way as directory navigation does in a website: If we navigate to a directory that doesn't have an index.html file, then the contents are displayed in a directory listing. But if there's an index.html file, then it is read and its HTML is displayed instead. Similarly, with require(), the index.js file will be the default file read if no other file is provided, which is the coding method we're using here.
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
// instantiate the server
// we assign this to the app variable so that we can later chain on methods to the express.js server... (app.listen() for example)
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// This is our way of telling the server that any time a client navigates to <ourhost>/api, the app will use the router we set up in apiRoutes. If / is the endpoint, then the router will serve back our HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// more express.js middleware that instructs the server to make certain files readily availabe and to not gate it behind a server endpoint
app.use(express.static('public'));

//this is the method we use to make our server listen... '.listen()'
//what is a port? it  is like a specific room on a college campus... (campus = host)
app.listen(PORT, () => {
	console.log(`API server now on port http://localhost:${PORT}`);
});
