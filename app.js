/////////////////////////////////////////////////
// The main file. The starting point.
// The heart of our app.
//
// @file:   app.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var express = require('express');
var pkgJson = require('./package.json');
var bodyParser = require('body-parser');
var responseTime = require('response-time');
var compress = require('compression');
require('./src/common/logging')();


// Initialize the database ORM
//
var knex = require('./src/config/knexConfig')().getConfig();


// Initialize the app object based on express framework 
//
var app = express();


// Configure the application server
//
// Basic configuration
var appName = pkgJson.name; // DO NOT hard-code app name here
var PORT = process.env.PORT || 5000;
// Enable GZIP compression
app.use(compress());
// Response time
app.use(responseTime());
// Set static folders
app.use(express.static('public', {
    // Set Expires header on outgoing images, css files and js files
    setHeaders: function(res, path, stat) {
        if(path.indexOf('bundle.js') === -1) {
            res.setHeader('Cache-Control', 'public, max-age=15778476000');
            res.setHeader('Expires', new Date(Date.now() + 15778476000).toUTCString());
        }
    }
}));
app.use(express.static('src/views'));
// Enable reading POST data in URL-encoded and JSON formats
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes configuration
var apiRouter = require('./src/routes/apiRoutes')(knex);
app.use('/api', apiRouter);


// Start the application server
//
app.listen(PORT, function(err) {
    // Show a confirmation message when the server starts
    console.log('Running ' + appName + ' on port ' + PORT);
});