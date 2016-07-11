/////////////////////////////////////////////////
// A No currency option component for Quotes pages
// (equivalent to null, since this field is nullable)
//
// @file:   CurrencyOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var CurrencyOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.currency.uom_id }></option>
        );
        /* jshint ignore:end */
    }

});

module.exports = CurrencyOption;