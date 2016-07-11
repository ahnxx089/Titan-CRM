/////////////////////////////////////////////////
// One message in ErrorBox.
// Essentially just a <li> element.
//
// @file:   ErrorBoxMsg.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');

var ErrorBoxMsg = React.createClass({
    render: function () {
        /* jshint ignore:start */
        return (
            <li>{ this.props.message }</li>
        );
        /* jshint ignore:end */
    }
});

module.exports = ErrorBoxMsg;