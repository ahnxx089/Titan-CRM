/////////////////////////////////////////////////
// The row component for the My Accounts table.
// 
//
// @file:   AccountRow.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var Link = require('react-router').Link;

var AccountRow = React.createClass({
    
    render: function () {
        var account = this.props.account;
        return (
            /* jshint ignore: start */
            <tr>
                <td>
                    <label>
                        <input type="checkbox"></input>
                    </label>
                </td>
                <td>
                    <Link to={"/cp/accounts/account-details/"+account.partyId}>{account.partyId}</Link>
                </td>
                <td>
                    <Link to={"/cp/accounts/account-details/"+account.partyId}>{account.orgName}</Link>
                </td>
                <td>
                    {account.officeSiteName}
                </td>
                <td>
                    <Link to={"/cp/accounts/account-details/"+account.parentPartyId}>{account.parentPartyId}</Link>
                </td>
                <td>
                    {account.statusId}
                </td>
            </tr>
            /*jshint ignore: end */
        );
    }
});

module.exports = AccountRow;