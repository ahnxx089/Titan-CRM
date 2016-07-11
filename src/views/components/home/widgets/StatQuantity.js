/////////////////////////////////////////////////
// Quantitative component for the StatWidget parent 
// component. 
//
// @file:   StatQuantity.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////
var React = require('react');

var StatQuantity = React.createClass({
    
    render: function () {
        /* jshint ignore: start */
        return (
            <div className="col-xs-8 text-center">
                <div className="big">{this.props.amount}</div>
                <div>
                    {this.props.unit}
                </div>
            </div>
        );
        /* jshint ignore: end */
    }
});

module.exports = StatQuantity;
