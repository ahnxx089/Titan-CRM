/////////////////////////////////////////////////
// A quoteStatusId option component for AddQuoteForm
//
// @file:   QuoteStatusIdOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var QuoteStatusIdOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.quoteStatusId.status_id }>
                { this.props.quoteStatusId.status_id }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = QuoteStatusIdOption;