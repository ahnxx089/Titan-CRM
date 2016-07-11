/////////////////////////////////////////////////
// A NoContactParty option component for inclusion in pages.
// (equivalent to null, since this field is nullable)
//
// @file:   ContactPartyOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var ContactPartyOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.contactParty.party_id }></option>
        );
        /* jshint ignore:end */
    }

});

module.exports = ContactPartyOption;