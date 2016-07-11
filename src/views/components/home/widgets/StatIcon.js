/////////////////////////////////////////////////
// Pictoral component for the StatWidget parent 
// component. 
//
// @file:   StatQuantity.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////
var React = require('react');

var StatIcon = React.createClass({
    
    render: function () {
        /* jshint ignore: start */
        return (
            <div className="col-xs-4">
                <span className={"fa-4x glyphicon glyphicon-" + this.props.icon}></span>
            </div>
        );
        /* jshint ignore: end */
    }
});

module.exports = StatIcon;