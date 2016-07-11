/////////////////////////////////////////////////
// A product option component for AddItemForm
//
// @file:   ProductOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var ProductOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.product.product_id }>{ this.props.product.product_id }</option>
        );
        /* jshint ignore:end */
    }

});

module.exports = ProductOption;