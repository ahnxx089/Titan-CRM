/////////////////////////////////////////////////
// The main page component that makes up the My 
// Accounts page.
// 
//
// @file:   MyAccountsPage.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

var React = require('react');
var AccountTable = require('./AccountTable');
var AccountsStore = require('../../../stores/AccountsStore');
var AccountsActions = require('../../../actions/AccountsActions');

var MyAccountsPage = React.createClass({
    getInitialState: function () {
        return {
            accountsOwned: [],
            accountsSelected: []
        };    
    },
    
    componentDidMount: function () {
        //in here we want to make an API call to getAccounts using the user's credentials
        //This method called below adds a listener for the 'getData' event to the store. 
        //It is that listener function that, when triggered by the arrival of getAccountsByOwner
        //data from the API, calls SetState to fill in the AccountTable and AccountRow child
        //components with the newly acquired values. 
        AccountsStore.addGetDataListener(this._onGetData); 
        
        AccountsActions.getAccountsByOwner();
    },
    
    componentWillUnmount: function() {
        // This prevents a console error
        AccountsStore.removeListener('getData', this._onGetData);
    },
    
    _onGetData: function () {
        this.setState({
            accountsOwned: AccountsStore.getAccountsOwned()
        });
    },
    
    render: function () {
        //Ok, so since this render method is called *after* componentDidMount, the _onGetData
        //event will have already fired and the state updated accordingly with the 
        //results of the API call. So we need to pull in that accountsOwned state 
        //and pass it to AccountTable as a prop. Then AccountTable will create an array 
        //of AccountRows out of that state array. 
        var accountsList = this.state.accountsOwned;
        
        return (
            /* jshint ignore: start */
            <div class="container">
            
                <div class="row">
                    <div class="h2">
                        <h2>My Accounts</h2>
                    </div>
                </div>
                <AccountTable accounts={accountsList} />
            </div>
            /* jshint ignore: end */
        );
        
    }
});

module.exports = MyAccountsPage;