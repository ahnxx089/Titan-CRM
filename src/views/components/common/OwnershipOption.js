/////////////////////////////////////////////////
// An ownership option on AddLead (under PartySupplementalDiv) and possibly other pages.
//
// @file:   OwnershipOptions.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var OwnershipOptions = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.ownership.enum_id }>
                { this.props.ownership.description ? this.props.ownership.description : this.props.ownership.enum_id }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = OwnershipOptions;