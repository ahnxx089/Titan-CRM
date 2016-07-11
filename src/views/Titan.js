/////////////////////////////////////////////////
// Entry-point for rendering the parent React
// component.
// This single-page React-based app provides
// the experience of a multipage app through routes.
//
// @file:   Titan.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;
var routes = require('./Routes');

/* jshint ignore:start */
ReactDOM.render(<Router routes={routes} history={hashHistory}/>, document.getElementById('app'));
/* jshint ignore:end */