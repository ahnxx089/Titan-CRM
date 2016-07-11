/////////////////////////////////////////////////
// All actions for Leads module pages.
//
// @file:   LeadsActions.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var LeadsConstants = require('../constants/LeadsConstants');

var LeadsActions = {
    
    getLeadsByOwner: function() {
        TitanDispatcher.dispatch({
            actionType: LeadsConstants.GET_MY_LEADS
        });
    },
    
    addLead: function (lead) {
        TitanDispatcher.dispatch({
            actionType: LeadsConstants.ADD_LEAD,
            // this data is used in LeadsStore
            data: lead
        });
    },
    
    getLeadById: function(id) {
//        console.log('in action');
        TitanDispatcher.dispatch({
            actionType: LeadsConstants.GET_LEAD_BY_ID,
            data: id
        });
    }
    
};

module.exports = LeadsActions;