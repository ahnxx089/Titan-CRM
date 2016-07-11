/////////////////////////////////////////////////
// A currency option component for inclusion in pages.
//
// @file:   CurrencyOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var CurrencyOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.currency.uom_id }>
                { this.props.currency.abbreviation } - { this.props.currency.description }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = CurrencyOption;