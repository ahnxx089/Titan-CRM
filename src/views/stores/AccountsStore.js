/////////////////////////////////////////////////
// Store for managing Accounts module page events.
//
// @file:   AccountsStore.js
// @author: DukJin Ahn <ahnxx089@gmail.com>
/////////////////////////////////////////////////

var EventEmitter = require('events').EventEmitter;
var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var AccountsConstants = require('../constants/AccountsConstants');
var $ = require('jquery');
var Cookies = require('js-cookie');
var validation = require('../../common/validation')();

// DATA
//-----------------------------------------------
var accountsOwned = [];
var singleAccount = {};
var addedAccountId = '';
var getByIdentity = {};
var accountsByIdentity = [];

// STORE as EVENT EMITTER
//-----------------------------------------------
var AccountsStore = new EventEmitter();

// CUSTOM METHODS
//-----------------------------------------------
AccountsStore.addGetDataListener = function (listener) {
    // see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    this.on('getData', listener);
};

AccountsStore.addAccountFormListener = function (listener) {
    this.on('change', listener);
};

AccountsStore.emitGetData = function() {
    // see https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2
    // Synchronously calls each of the listeners registered for the event named 'getData'
    // In previous function addGetDataListener is where listeners such as 
    // ._onGetData registered to get emits from this Store
    this.emit('getData');
};

AccountsStore.addAddedAccountListener = function (listener) {
    this.on('addedAccount', listener);
};

AccountsStore.emitAddedAccount = function () {
    this.emit('addedAccount');
};

AccountsStore.addGetByIdentityListener = function (listener) {
    this.on('getByIdentity', listener);
};

AccountsStore.emitGetByIdentity = function() {
    this.emit('getByIdentity');  
};







// BUSINESS LOGIC
//-----------------------------------------------

//Note from Eric: I'm willing to follow this same logic flow as the other teams
//for the sake of speed in development, I suppose. But it is not at all apparent 
//to me why we have to set up a complicated event emitting/listening chain for the
//SOLE purpose of retrieving the array of results from the below .ajax() call. 
//Given that we are using jQuery version 3.x, which is now compliant with the 
//A+/Promises specification, which in turn means that jQuery promises should be 
//resolved to a single value and ".thenable" blah blah blah, is there any good 
//reason why we cannot or should not simply use the single getAccountsByOwner store 
//method below (changed to return the "accounts" result variable) and call that from 
//MyAccountsPage's componentDidMount, thus being able to update the state more simply?
//This extra batch of code doesn't entirely sit well with me. 
AccountsStore.getAccountsByOwner = function() {
    var thisAccountsStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/accounts/',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(accounts) {
            accountsOwned = accounts;
            thisAccountsStore.emitGetData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

AccountsStore.getAccountById = function (id) {
    var thisAccountsStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/accounts/' + id,
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function (account) {
            singleAccount = account;
            thisAccountsStore.emitGetData();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

AccountsStore.getAccountsOwned = function() {
    return accountsOwned;
};

AccountsStore.getSingleAccount = function () {
    return singleAccount;
};

AccountsStore.getAddedAccountId = function () {
    return addedAccountId;
};

// Next function is called by CreateAccountPage
AccountsStore.addAccounts = function(account) {
    var thisAccountsStore = this;
    $.ajax({
        type: 'POST',
        url: '/api/accounts/',
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        data: account,
        success: function(partyId) {
            addedAccountId = partyId;
            AccountsStore.emitAddedAccount();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

AccountsStore.getAccountsByIdentity = function(identity) {
    var thisAccountsStore = this;
    
    // an empty search box for first or last name comes in as empty string, keep as empty string;
    // if not empty then clean off any whitespaces (reminder: cannot not send empty string to validation.sanitizeInput,
    // which returns null in that case, which would make e.g. var lastName = null instead of = '' )
    var accountId = (identity.accountId === '' ? '' : validation.sanitizeInput(identity.accountId));
    var accountName = (identity.accountName === '' ? '' : validation.sanitizeInput(identity.accountName));

    var queryString = '?accountId=' + accountId + '&accountName'+ accountName;
    
    $.ajax({
        type: 'GET',
        url: '/api/accounts' + queryString,
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        success: function(account) {
            accountsByIdentity = account; // contactApi.getContactsByIdentity returns an array of Contact entities
            thisAccountsStore.emitGetByIdentity();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

AccountsStore.getByIdentity = function() {
    return accountsByIdentity;
};

// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {
    
    switch(action.actionType) {
        case AccountsConstants.GET_MY_ACCOUNTS: {
            AccountsStore.getAccountsByOwner();
            break;
        }
        case AccountsConstants.ADD_ACCOUNT: {
            AccountsStore.addAccounts(action.data);
            break;
        }
        case AccountsConstants.GET_ACCOUNT_BY_ID: {
            AccountsStore.getAccountById(action.id);
            break;
        }
        case AccountsConstants.GET_ACCOUNTS_BY_IDENTITY: {
            AccountsStore.getAccountsByIdentity(action.data);
            break;
        }    
    }
    
});

module.exports = AccountsStore;