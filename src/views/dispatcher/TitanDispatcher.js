/////////////////////////////////////////////////
// The application-wide Flux dispatcher.
// Based on Dispatcher provided by the flux pkg.
// This is the official Facebook implementation.
//
// Contains methods -- register() and dispatch()
// Details -- https://facebook.github.io/flux/docs/dispatcher.html
//
// @file:   TitanDispatcher.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var Dispatcher = require('flux').Dispatcher;
var TitanDispatcher = new Dispatcher();

module.exports = TitanDispatcher;