/////////////////////////////////////////////////
// A contactParty option component for inclusion in pages.
//
// @file:   ContactPartyOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var ContactPartyOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.contactParty.party_id }>
                { this.props.contactParty.party_id } - { this.props.contactParty.first_name } { this.props.contactParty.last_name }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = ContactPartyOption;