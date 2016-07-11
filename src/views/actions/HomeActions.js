/////////////////////////////////////////////////
// All actions for home page.
//
// @file:   HomeActions.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var HomeConstants = require('../constants/HomeConstants');

var HomeActions = {
    
    getContactById: function(id) {
        TitanDispatcher.dispatch({
            actionType: HomeConstants.HOME_GET_CONTACT,
            id: id
        });
    }
    
};

module.exports = HomeActions;