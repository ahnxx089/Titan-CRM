/////////////////////////////////////////////////
// Business logic helper file for all modules writing contact information to new database entries
// Inherits from ContactMechController.
// Intended for use in all modules' addX methods.
//
// @file:   contactInfoHelper.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////
var contactMechController = require('../contactMechController');
var ContactMech = require('../../entities/contactMech');

var contactInfoHelper = function(target) {
    var now = (new Date()).toISOString();
    // Convert the received objects into entities (protect the data layer)
    //
    // Contact mechanisms
    var contactMechEntities = [];

    if (target.emailAddress) {
        var emailContactMech = new ContactMech(
            null,
            'EMAIL_ADDRESS',
            'PRIMARY_EMAIL',
            target.emailAddress,
            now,
            now
        );
        contactMechEntities.push(emailContactMech);
    }
    if (target.webAddress) {
        var webContactMech = new ContactMech(
            null,
            'WEB_ADDRESS',
            'PRIMARY_WEB_URL',
            target.webAddress,
            now,
            now
        );
        contactMechEntities.push(webContactMech);
    }
    if (target.contactNumber) {
        var phoneContactMech = new ContactMech(
            null,
            'TELECOM_NUMBER',
            'PRIMARY_PHONE',
            null, // null info string
            now,
            now,
            target.countryCode,
            target.areaCode,
            target.contactNumber,
            target.askForName
        );
        contactMechEntities.push(phoneContactMech);
    }
    if (target.countryGeoId) {
        var addressContactMech = new ContactMech(
            null,
            'POSTAL_ADDRESS',
            'PRIMARY_LOCATION',
            null, // null info string
            now,
            now,
            null,
            null,
            null,
            null,
            target.toName,
            target.attnName,
            target.address1,
            target.address2,
            target.directions,
            target.city,
            target.stateProvinceGeoId,
            target.zipOrPostalCode,
            target.countryGeoId
        );
        contactMechEntities.push(addressContactMech);
    }
 
    return contactMechEntities;
   
};

module.exports = contactInfoHelper;