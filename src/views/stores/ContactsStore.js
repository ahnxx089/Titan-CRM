/////////////////////////////////////////////////
// Store for managing Contacts module page events.
//
// @file:   ContactsStore.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
//          William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

var EventEmitter = require('events').EventEmitter;
var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var ContactsConstants = require('../constants/ContactsConstants');
var $ = require('jquery');
var Cookies = require('js-cookie');
var validation = require('../../common/validation')();


// DATA
//-----------------------------------------------
var contactsOwned = [];
var addedContactPartyId = '';   // for returning party_id of an added Contact
var contactsByIdentity = [];    // for returning contacts retrieved by identity (first and/or last name)
var contactsByPhoneNumber = [];    // for returning contacts retrieved by phone number
var contactRetrieved = {};
var updateRes = null;


// STORE as EVENT EMITTER
//-----------------------------------------------
var ContactsStore = new EventEmitter();


// CUSTOM METHODS
//-----------------------------------------------
/* Next 2 functions:  for Views receiving emits after getContactsByOwner */
ContactsStore.addGetDataListener = function (listener) {
    // see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    this.on('getData', listener);
};

ContactsStore.emitGetData = function() {
    // see https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2
    // Synchronously calls each of the listeners registered for the event named 'getData'
    // In previous function addGetDataListener is where listeners such as
    // MyContactsPage._onGetData registered to get emits from this Store
    this.emit('getData');
};

ContactsStore.addPutDataListener = function (listener) {
    this.on('putData', listener);
};

ContactsStore.emitPutData = function() {
    this.emit('putData');
};

/* Next 2 functions:  for Views receiving emits after addContact */
ContactsStore.addedContactListener = function (listener) {
    this.on('addedContact', listener);
};

ContactsStore.emitAddedContact = function() {
    this.emit('addedContact');
};

/* Next 2 functions:  for Views receiving emits after getContactsByIdentity (first or last name) */
ContactsStore.addGetByIdentityListener = function (listener) {
    this.on('getByIdentity', listener);
};

ContactsStore.emitGetByIdentity = function() {
    this.emit('getByIdentity');
};

/* Next 2 functions:  for Views receiving emits after getContactsByPhoneNumber */
ContactsStore.addGetByPhoneNumberListener = function (listener) {
    this.on('getByPhoneNumber', listener);
};

ContactsStore.emitGetByPhoneNumber = function() {
    this.emit('getByPhoneNumber');
};


// BUSINESS LOGIC
//-----------------------------------------------
//
// Next two functions are called by MyContactsPage
ContactsStore.getContactsByOwner = function() {
    var thisContactsStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/contacts/',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contacts) {
            contactsOwned = contacts;
            thisContactsStore.emitGetData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.getContactsOwned = function() {
    return contactsOwned;
};

ContactsStore.updateContact = function(contactId, contact) {
    var thisContactsStore = this;
    $.ajax({
        type: 'PUT',
        url: '/api/contacts/' + contactId,
        headers: {
            'x-access-token': Cookies.get('titanAuthToken')
        },
        data: contact,
        success: function(res) {
            updateRes = res;
            thisContactsStore.emitPutData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.getUpdateRes = function() {
    return updateRes;
};

ContactsStore.getContactById = function(id) {
    var thisContactsStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/contacts/' + id,
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contact) {
            contactRetrieved = contact;
            thisContactsStore.emitGetData();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.gotContact = function() {
    return contactRetrieved;
};

// Next two functions are called by CreateContactPage
ContactsStore.addContact = function(contact) {
    var thisContactsStore = this;
    $.ajax({
        type: 'POST',
        url: '/api/contacts/',
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        data: contact,
        success: function(partyId) {
            addedContactPartyId = partyId; // contactApi.addContact returns partyId of successfully added Contact
            thisContactsStore.emitAddedContact();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.addedContact = function() {
    return addedContactPartyId;
};

// Next two functions are called by FindContactPage to getContactsByIdentity
ContactsStore.getContactsByIdentity = function(identity) {
    var thisContactsStore = this;

    // an empty search box for first or last name comes in as empty string, keep as empty string;
    // if not empty then clean off any whitespaces (reminder: cannot not send empty string to validation.sanitizeInput,
    // which returns null in that case, which would make e.g. var lastName = null instead of = '' )
    var firstName = (identity.firstName === '' ? '' : validation.sanitizeInput(identity.firstName));
    var lastName  = (identity.lastName  === '' ? '' : validation.sanitizeInput(identity.lastName ));

    var queryString = '?firstName=' + firstName + '&lastName=' + lastName;

    $.ajax({
        type: 'GET',
        url: '/api/contacts' + queryString,
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contact) {
            contactsByIdentity = contact; // contactApi.getContactsByIdentity returns an array of Contact entities
            thisContactsStore.emitGetByIdentity();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.getByIdentity = function() {
    return contactsByIdentity;
};

// Next two functions are called by FindContactPage to getContactsByPhoneNumber
ContactsStore.getContactsByPhoneNumber = function(phoneNumber) {
    var thisContactsStore = this;

    // an empty search box comes in as empty string, keep as empty string;
    // if not empty then clean off any whitespaces (reminder: cannot not send empty string to validation.sanitizeInput,
    // which returns null in that case, which would make e.g. var lastName = null instead of = '' )
    var contactNumber = (phoneNumber.contactNumber === '' ? '' : validation.sanitizeInput(phoneNumber.contactNumber));
    var countryCode   = (phoneNumber.countryCode   === '' ? '' : validation.sanitizeInput(phoneNumber.countryCode  ));
    var areaCode      = (phoneNumber.areaCode      === '' ? '' : validation.sanitizeInput(phoneNumber.areaCode     ));

    var queryString = '?contactNumber=' + contactNumber + '&countryCode=' + countryCode + '&areaCode=' + areaCode;

    $.ajax({
        type: 'GET',
        url: '/api/contacts' + queryString,
        headers: {  'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contact) {
            // contactApi.getContactsByPhoneNumber returns an array of objects (Contact + ContactMech Entity)
            contactsByPhoneNumber = contact;
            thisContactsStore.emitGetByPhoneNumber();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

ContactsStore.getByPhoneNumber = function() {
    return contactsByPhoneNumber;
};


// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {

    switch(action.actionType) {
        case ContactsConstants.GET_MY_CONTACTS: {
            ContactsStore.getContactsByOwner();
            break;
        }
        case ContactsConstants.ADD_CONTACT: {
            ContactsStore.addContact(action.data);
            break;
        }
        case ContactsConstants.GET_CONTACT_BY_ID: {
            ContactsStore.getContactById(action.data);
            break;
        }
        case ContactsConstants.GET_CONTACTS_BY_IDENTITY: {
            ContactsStore.getContactsByIdentity(action.data);
            break;
        }
        case ContactsConstants.GET_CONTACTS_BY_PHONE_NUMBER: {
            ContactsStore.getContactsByPhoneNumber(action.data);
            break;
        }
        case ContactsConstants.UPDATE_CONTACT: {
            ContactsStore.updateContact(action.data.contactId, action.data.contact);
            break;
        }
    }

});

module.exports = ContactsStore;