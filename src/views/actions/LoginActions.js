/////////////////////////////////////////////////
// All actions for login page.
//
// @file:   LoginActions.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var LoginConstants = require('../constants/LoginConstants');

var LoginActions = {
    
    authenticateUser: function(username, password) {
        TitanDispatcher.dispatch({
            actionType: LoginConstants.LOGIN_AUTHENTICATE_USER,
            username: username,
            password: password
        });
    }
    
};

module.exports = LoginActions;