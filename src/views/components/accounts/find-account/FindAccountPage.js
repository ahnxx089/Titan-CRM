/////////////////////////////////////////////////
// Find Acccount page component.
//
// @file:   FindAccountPage.js
// @author: DukJin Ahn(ahnxx089@gmail.com)
/////////////////////////////////////////////////

var React = require('react');
var ReactRouter = require('react-router');

var FindAccountForm = require('./FindAccountForm'); 
var AccountsStore = require('../../../stores/AccountsStore');
var AccountsActions = require('../../../actions/AccountsActions');

var FindAccountPage = React.createClass({
   
    /* 
        Find By accountID  --> accountsfield.partyId,
        Find By accountName --> namefield. accountName
    */
    getInitialState: function() {
        return {
            accountsOwned: null
        };
    },
    
    componentDidMount: function() {
        // register with Store as a listener for emit of new party_id of the added Account
    
        AccountsStore.addGetByIdentityListener(this._onFindedByIdentity);
        
        AccountsActions.getAccountsByIdentity();
        
    },
    
    componentWillUnmount: function() {
        // avoids console error, accompanies function call in componentDidMount
        
        AccountsStore.removeListener('getByIdentity', this._onFindedAccount);
    },
        
    setIdFieldState: function (event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.idField[field] = value;
        this.setState({ idField: this.state.idField });
        this.setState({ nameField: { accountName: ''} });
    },
    
    // saves strings typed in "Find By Name" and resets other states to empty 
    setNameFieldState: function (event) {
        var field = event.target.id;
        var value = event.target.value;
        this.state.nameField[field] = value;
        this.setState({ nameField: this.state.nameField });
        this.setState({ idField: { accountId: '' } });
    },

    _resetForm: function (event) {
        this.setState({
            idField: { accountId: '' }, 
            nameField: { accountName: ''},
            contactsFound: null
        });
    },

    
    // Checking non-zero-length string, so only one Action is initiated
    _findAccounts: function (event) {
        event.preventDefault();

        var accountId = this.state.idField.accountId;
        var accountName = this.state.nameField.accountName;
        
        var identity = {
            accountId: accountId,
            accountName: accountName
        };

        if (partyId.length > 0){
            AccountsActions.getAccountById(accountId);
        }
        if  (accountName.length > 0) {
            AccountsActions.getAccountsByIdentity(identity);
        }
    },


    _onFindedByIdentity: function () {
        this.setState({
            accountsByIdentity: AccountsStore.getByIdentity()
        });
    },

    
    
    
    render: function (){
        
        /* jshint ignore:start */  
        
        var accounts = this.state.accountsOwned;
        var accountsJSX = [];
        // for a result from initiating action getAccountssByIdentity(identity)
        
        if ( Object.prototype.toString.call(accounts) === '[object Object]' ){
            // when search by Id turns up no result, the returned object lacks a partyId, 
            // so this prevents an empty row from rendering
            if (accounts.hasOwnProperty('accountId')){
                accountsJSX.push(<AccountRow key={ 'account_0' } account={ accounts }/>);
            }
        }
                                 
        if ( Object.prototype.toString.call(accounts) === '[object Array]' ){
            for (var i = 0; i < accounts.length; i++) {
                accountsJSX.push(<AccountRow key={ 'account_' + i } account={ accounts[i]}/>);
            }
        }
    
        return (
                <div>
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading panel-heading-custom">
                                <h1>Find Account</h1>
                            </div>
                            <div className="panel-body">
                            <SearchForm
                                idField={ this.state.idField }
                                nameField={ this.state.nameField }
                                onIdFieldChange={ this.setIdFieldState }
                                onNameFieldChange={ this.setNameFieldState }
                                onFormSubmit={ this._findAccounts }
                                onFormReset={ this._resetForm } />                        
                        </div>
                    </div>
                                 
                <div className="panel panel-default">
                        <div className="panel-heading panel-heading-custom">
                                <h4>Account Lists</h4>
                            </div>
                            <div className="panel-body">
                                <table id="findAccountsTable" className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Account ID</th>
                                            <th>Account Name</th>
                                            <th>Address Line</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { accountsJSX }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        
        );
        /* jshint ignore:end */
    }
});

module.exports = FindAccountPage;