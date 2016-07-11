/////////////////////////////////////////////////
// The table component for the My Accounts page.
// 
//
// @file:   AccountTable.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var AccountRow = require('./AccountRow');

var AccountTable = React.createClass({
    
    render: function () {
        var accounts = this.props.accounts;
        var accountsJSX = [];
        /* jshint ignore: start */
        for(var i = 0; i < accounts.length; i++) {
            accountsJSX.push(<AccountRow key={'account_' + i} account={accounts[i]} />);
        }
        
        
        return (
            <table id="myAccountsTable" className="table">
                <thead>
                    <tr>
                        <th>Select All</th>
                        <th>ID</th>
                        <th>Account Name</th>
                        <th>Site Name</th>
                        <th>Parent ID</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { accountsJSX }    
                </tbody>
            </table>
        );
        /* jshint ignore: end */
    }
}); 

module.exports = AccountTable;