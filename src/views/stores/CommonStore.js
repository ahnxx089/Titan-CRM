/////////////////////////////////////////////////
// Store for managing Common page events.
// E.g., get currency, state or province, country
//
// @file:   CommonStore.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
//          William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint maxcomplexity: false */

var EventEmitter = require('events').EventEmitter;
var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var CommonConstants = require('../constants/CommonConstants');
var $ = require('jquery');
var Cookies = require('js-cookie');


// DATA
//-----------------------------------------------
var currenciesObjArray = [];
var stateProvinceObjArray = [];
var countriesObjArray = [];
var quoteTypesObjArray = [];
var quoteStatusIdsObjArray = [];
var accountPartiesObjArray = [];
var contactPartiesObjArray = [];
var salesChannelsObjArray = [];
var productsObjArray = [];
var ownershipsObjArray = [];
var contactMechTypeArray = [];
var contactMechPurposeTypeArray = [];


// STORE as EVENT EMITTER
//-----------------------------------------------
var CommonStore = new EventEmitter();


// CUSTOM METHODS
//-----------------------------------------------
CommonStore.addGetAllCurrenciesListener = function (listener) {
    // see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
    this.on('getAllCurrencies', listener);
};

CommonStore.emitGetAllCurrencies = function() {
    // see https://nodejs.org/api/events.html#events_emitter_emit_eventname_arg1_arg2
    // Synchronously calls each of the listeners registered for the event named 'getCurrencies'.
    // In previous function addGetAllCurrenciesListener is where listeners registers to get emits.
    this.emit('getAllCurrencies');
};

CommonStore.addGetAllStatesOrProvincesListener = function (listener) {
    this.on('getAllStatesOrProvinces', listener);
};

CommonStore.emitGetAllStatesOrProvinces = function() {
    this.emit('getAllStatesOrProvinces');
};

CommonStore.addGetAllCountriesListener = function (listener) {
    this.on('getAllCountries', listener);
};

CommonStore.emitGetAllCountries = function() {
    this.emit('getAllCountries');
};

CommonStore.addGetQuoteTypesListener = function (listener) {
    this.on('getQuoteTypes', listener);
};

CommonStore.emitGetQuoteTypes = function() {
    this.emit('getQuoteTypes');
};

CommonStore.addGetQuoteStatusIdsListener = function (listener) {
    this.on('getQuoteStatusIds', listener);
};

CommonStore.emitGetQuoteStatusIds = function() {
    this.emit('getQuoteStatusIds');
};

CommonStore.addGetAccountPartiesListener = function (listener) {
    this.on('getAccountParties', listener);
};

CommonStore.emitGetAccountParties = function() {
    this.emit('getAccountParties');
};

CommonStore.addGetContactPartiesListener = function (listener) {
    this.on('getContactParties', listener);
};

CommonStore.emitGetContactParties = function() {
    this.emit('getContactParties');
};

CommonStore.addGetSalesChannelsListener = function (listener) {
    this.on('getSalesChannels', listener);
};

CommonStore.emitGetSalesChannels = function() {
    this.emit('getSalesChannels');
};

CommonStore.addGetProductsListener = function (listener) {
    this.on('getProducts', listener);
};

CommonStore.emitGetProducts = function() {
    this.emit('getProducts');
};

CommonStore.addGetAllOwnershipsListener = function (listener) {
    this.on('getAllOwnerships', listener);
};

CommonStore.emitGetAllOwnerships = function() {
    this.emit('getAllOwnerships');
};

CommonStore.addGetContactMechTypesListener = function (listener) {
    this.on('getContactMechTypes', listener);
};

CommonStore.emitGetContactMechTypes = function() {
    this.emit('getContactMechTypes');
};

CommonStore.addGetContactMechPurposeTypesListener = function (listener) {
    this.on('getContactMechPurposeTypes', listener);
};

CommonStore.emitGetContactMechPurposeTypes = function() {
    this.emit('getContactMechPurposeTypes');
};

// BUSINESS LOGIC
//-----------------------------------------------
CommonStore.getAllCurrencies = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=uomCurrency',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(allCurrencies) {
            currenciesObjArray = allCurrencies;
            thisCommonStore.emitGetAllCurrencies();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getCurrenciesObjArray = function() {
    return currenciesObjArray;
};

CommonStore.getAllStatesOrProvinces = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=geoStateOrProvince',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(allStatesOrProvinces) {
            stateProvinceObjArray = allStatesOrProvinces;
            thisCommonStore.emitGetAllStatesOrProvinces();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getStatesOrProvincesObjArray = function() {
    return stateProvinceObjArray;
};

CommonStore.getAllCountries = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=geoCountry',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(allCountries) {
            countriesObjArray = allCountries;
            thisCommonStore.emitGetAllCountries();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getCountriesObjArray = function() {
    return countriesObjArray;
};

CommonStore.getQuoteTypes = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=quoteType',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(quoteTypes) {
            quoteTypesObjArray = quoteTypes;
            thisCommonStore.emitGetQuoteTypes();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getQuoteTypesObjArray = function() {
    return quoteTypesObjArray;
};

CommonStore.getQuoteStatusIds = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=quoteStatusId',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(quoteStatusIds) {
            quoteStatusIdsObjArray = quoteStatusIds;
            thisCommonStore.emitGetQuoteStatusIds();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getQuoteStatusIdsObjArray = function() {
    return quoteStatusIdsObjArray;
};

CommonStore.getAccountParties = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=accountParty',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(accountParties) {
            accountPartiesObjArray = accountParties;
            thisCommonStore.emitGetAccountParties();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getAccountPartiesObjArray = function() {
    return accountPartiesObjArray;
};

CommonStore.getContactParties = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=contactParty',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(contactParties) {
            contactPartiesObjArray = contactParties;
            thisCommonStore.emitGetContactParties();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getContactPartiesObjArray = function() {
    return contactPartiesObjArray;
};

CommonStore.getSalesChannels = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=salesChannel',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(salesChannels) {
            salesChannelsObjArray = salesChannels;
            thisCommonStore.emitGetSalesChannels();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getSalesChannelsObjArray = function() {
    return salesChannelsObjArray;
};

CommonStore.getProducts = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=product',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(products) {
            productsObjArray = products;
            thisCommonStore.emitGetProducts();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getProductsObjArray = function() {
    return productsObjArray;
};

CommonStore.getAllOwnerships = function() {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=ownership',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(ownerships) {
            ownershipsObjArray = ownerships;
            thisCommonStore.emitGetAllOwnerships();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getOwnershipsObjArray = function() {
    return ownershipsObjArray;
};

CommonStore.getContactMechTypes = function(typeId) {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=contactMechType',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(result) {
            contactMechTypeArray = result;
            thisCommonStore.emitGetContactMechTypes();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getContactMechPurposeTypes = function(purposeTypeId) {
    var thisCommonStore = this;
    $.ajax({
        type: 'GET',
        url: '/api/common-data?type=contactMechPurposeType',
        headers: { 'x-access-token': Cookies.get('titanAuthToken') },
        success: function(result) {
            contactMechPurposeTypeArray = result;
            thisCommonStore.emitGetContactMechPurposeTypes();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
};

CommonStore.getTypeArray = function() {
    return contactMechTypeArray;
};

CommonStore.getPurposeTypeArray = function() {
    return contactMechPurposeTypeArray;
};

// LINK BETWEEN DISPATCHER AND STORE
//-----------------------------------------------
TitanDispatcher.register(function(action) {

    switch(action.actionType) {
        case CommonConstants.GET_ALL_CURRENCIES: {
            CommonStore.getAllCurrencies();
            break;
        }
        case CommonConstants.GET_ALL_STATES_OR_PROVINCES: {
            CommonStore.getAllStatesOrProvinces();
            break;
        }
        case CommonConstants.GET_ALL_COUNTRIES: {
            CommonStore.getAllCountries();
            break;
        }
        case CommonConstants.GET_QUOTE_TYPES: {
            CommonStore.getQuoteTypes();
            break;
        }
        case CommonConstants.GET_QUOTE_STATUS_IDS: {
            CommonStore.getQuoteStatusIds();
            break;
        }
        case CommonConstants.GET_ACCOUNT_PARTIES: {
            CommonStore.getAccountParties();
            break;
        }
        case CommonConstants.GET_CONTACT_PARTIES: {
            CommonStore.getContactParties();
            break;
        }
        case CommonConstants.GET_SALES_CHANNELS: {
            CommonStore.getSalesChannels();
            break;
        }
        case CommonConstants.GET_PRODUCTS: {
            CommonStore.getProducts();
            break;
        }
        case CommonConstants.GET_ALL_OWNERSHIPS: {
            CommonStore.getAllOwnerships();
            break;
        }
        case CommonConstants.GET_CONTACT_MECH_TYPES: {
            CommonStore.getContactMechTypes();
            break;
        }
        case CommonConstants.GET_CONTACT_MECH_PURPOSE_TYPES: {
            CommonStore.getContactMechPurposeTypes();
            break;
        }
    }

});

module.exports = CommonStore;