/////////////////////////////////////////////////
// An accountParty option component for inclusion in pages.
//
// @file:   AccountPartyOption.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var React = require('react');

var AccountPartyOption = React.createClass({

    render: function () {
        /* jshint ignore:start */
        return (
            <option value={ this.props.accountParty.party_id }>
                { this.props.accountParty.party_id }
            </option>
        );
        /* jshint ignore:end */
    }

});

module.exports = AccountPartyOption;