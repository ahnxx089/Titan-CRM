/////////////////////////////////////////////////
// A state-or-province option on AddContactMech page.
//
// @file:   StateProvinceOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var StateProvinceOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.stateProvince.geo_id }>
                { this.props.stateProvince.abbreviation } - { this.props.stateProvince.geo_name }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = StateProvinceOption;