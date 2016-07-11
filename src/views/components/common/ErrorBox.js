/////////////////////////////////////////////////
// Container to display error messages.
// Appears at the top, just below the nav.
//
// @file:   ErrorBox.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var React = require('react');
var ErrorBoxMsg = require('./ErrorBoxMsg');

var ErrorBox = React.createClass({
    render: function () {
        /* jshint ignore:start */
        // Check the type of "messages"
        var messages = this.props.messages;
        var typeOfMessages = Object.prototype.toString.call(messages);
        var ErrorBoxMsgs = [];
        // If "messages" is a string, treat it like a single message
        if (typeOfMessages === '[object String]') {
            ErrorBoxMsgs.push(<ErrorBoxMsg message={ messages }/>);
        }
        // If "messages" is an array, create an <li> for each element in array
        else if (typeOfMessages === '[object Array]') {
            for (var i=0; i < messages.length; i++) {
                ErrorBoxMsgs.push(<ErrorBoxMsg key={ 'ebm_' + i } message={ messages[i] }/>);
            }
        }
        
        if (ErrorBoxMsgs.length > 0) {
            return (
                <div id="ErrorBox" className="alert alert-danger">
                    { ErrorBoxMsgs }
                </div>
            );
        }
        
        return (
            <div></div>
        );
        /* jshint ignore:end */
    }
});

module.exports = ErrorBox;