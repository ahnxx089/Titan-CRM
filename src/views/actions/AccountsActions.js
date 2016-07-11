/////////////////////////////////////////////////
// All actions for home page.
//
// @file:   HomeActions.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var AccountsConstants = require('../constants/AccountsConstants');

var AccountsActions = {
    getAccountsByOwner: function () {
        TitanDispatcher.dispatch({
            actionType: AccountsConstants.GET_MY_ACCOUNTS
        });
    },
    
    getAccountById: function (id) {
        TitanDispatcher.dispatch({
            actionType: AccountsConstants.GET_ACCOUNT_BY_ID, 
            id: id
        });
    },
    
    getAccountsByIdentity: function(identity) {
        TitanDispatcher.dispatch({
            actionType: AccountsConstants.GET_ACCOUNTS_BY_IDENTITY,
            data: identity
        });
    },
    
    addAccount: function (account) {
        TitanDispatcher.dispatch({
            actionType: AccountsConstants.ADD_ACCOUNT,
            data: account
        });  
    }
};

module.exports = AccountsActions;
