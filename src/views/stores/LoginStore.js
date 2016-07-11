/////////////////////////////////////////////////
// Store for managing login page events.
//
// @file:   LoginStore.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var EventEmitter = require('events').EventEmitter;
var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var LoginConstants = require('../constants/LoginConstants');
var $ = require('jquery');

// DATA
//-----------------------------------------------
var authData = {
    success: false,
    message: '',
    token: ''
};


// STORE as EVENT EMITTER
//-----------------------------------------------
var LoginStore = new EventEmitter();


// CUSTOM METHODS
//-----------------------------------------------
LoginStore.emitAuth = function() {
    this.emit('auth');  
};

LoginStore.addAuthListener = function(listener) {
    this.on('auth', listener);
};


// BUSINESS LOGIC
//-----------------------------------------------
LoginStore.authenticateUser = function(username, password) {
    var thisLoginStore = this;
    $.ajax({
        type: 'POST',
        url: '/api/authenticate',
        data: { userId: username, password: password },
        dataType: 'json',
        success: function(authResult) {
            authData = authResult;
            thisLoginStore.emitAuth();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

LoginStore.getAuthData = function() {
    return authData;
};


// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {

    switch(action.actionType) {
        case LoginConstants.LOGIN_AUTHENTICATE_USER: {
            LoginStore.authenticateUser(action.username, action.password);
            break;
        }
    }
    
});

module.exports = LoginStore;