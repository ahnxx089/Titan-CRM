/////////////////////////////////////////////////
// A quoteType option component for AddQuoteForm
//
// @file:   QuoteTypeOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var QuoteTypeOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.quoteType.quote_type_id }>
                { this.props.quoteType.quote_type_id }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = QuoteTypeOption;