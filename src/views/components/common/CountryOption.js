/////////////////////////////////////////////////
// A country option on AddContactMech page.
//
// @file:   CountryOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var CountryOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.country.geo_id }>
                { this.props.country.abbreviation } - { this.props.country.geo_name }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = CountryOption;