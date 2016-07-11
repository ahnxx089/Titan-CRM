/////////////////////////////////////////////////
// A salesChannel option component for inclusion in pages.
//
// @file:   SalesChannelOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var SalesChannelOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.salesChannel.enum_id }>
                { this.props.salesChannel.description }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = SalesChannelOption;