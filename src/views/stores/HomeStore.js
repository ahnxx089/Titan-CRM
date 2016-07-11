/////////////////////////////////////////////////
// Store for managing home page events.
//
// @file:   HomeStore.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var EventEmitter = require('events').EventEmitter;
var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var HomeConstants = require('../constants/HomeConstants');
var $ = require('jquery');
var Cookies = require('js-cookie');

// DATA
//-----------------------------------------------
var contactDetails = {
  partyId: 0,
  partyTypeId: 'NA',
  description: 'NA',
  statusId: 'PARTY_DISABLED',
  createdBy: 'admin',
  createdDate: 'NA',
  updatedDate: 'NA',
  salutation: 'Ms.',
  firstName: 'Joana',
  middleName: '',
  lastName: 'Doe',
  birthDate: 'NA',
  comments: 'NA',
  contactMechs: []
};


// STORE as EVENT EMITTER
//-----------------------------------------------
var HomeStore = new EventEmitter();


// CUSTOM METHODS
//-----------------------------------------------
HomeStore.emitChange = function() {
    this.emit('change');  
};

HomeStore.addChangeListener = function(listener) {
    this.on('change', listener);
};


// BUSINESS LOGIC
//-----------------------------------------------
HomeStore.getContactById = function(contactId) {
    var thisHomeStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/contacts/' + contactId,
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contact) {
            contactDetails = contact;
            thisHomeStore.emitChange();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

HomeStore.getContactDetails = function() {
    return contactDetails;
};


// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {

    switch(action.actionType) {
        case HomeConstants.HOME_GET_CONTACT: {
            HomeStore.getContactById(action.id);
            break;
        }
    }
    
});

module.exports = HomeStore;