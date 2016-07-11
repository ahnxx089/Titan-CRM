/////////////////////////////////////////////////
// Business logic module for contacts.
//
// @file:    contactController.js
// @authors: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */
/* jshint maxcomplexity: false */
/* jshint shadow:true */

var winston = require('winston');
var Contact = require('../entities/contact');
var ContactMech = require('../entities/contactMech');
var _ = require('lodash');

var contactController = function (knex) {
    // Get a reference to data layer module
    //
    var contactData = require('../data/contactData')(knex);
    var contactMechData = require('../data/contactMechData')(knex);
    var contactMechController = require('../controllers/contactMechController')(knex);

    // CONTROLLER METHODS
    // ==========================================
    //

    /**
     * For each promise delivered by addContactMech,
     * create entry in party_contact_mech table
     * and chain all promises together with .then()
     * @param {object} addContactMechPromises - An array of promises returned by addContactMech
     * @param {object} contactMechEntities - An array containing the contactMechs used to generate the first array
     * @param {Number} partyId - The partyId of the contact to be linked to these contactMechs
     * @return {object} addContactMechPromises - Fulfillment value is the fulfillment value of the last promise in the array
     */
    var addContactMechCallback = function (addContactMechPromises, contactMechEntities, partyId) {
        var promise;
        var contactMech;
        var purposeTypeId;
        if (addContactMechPromises.length > 1) {
            promise = addContactMechPromises.pop();
            contactMech = contactMechEntities.pop();
            purposeTypeId = contactMech.contactMechPurposeTypeId;
            return promise.then(function (contactMechId) {
                return contactMechController.linkContactMechToParty(partyId, contactMechId, purposeTypeId)
                    .then(function () {
                        return addContactMechCallback(addContactMechPromises, contactMechEntities, partyId);
                    });
            });
        } else {
            promise = addContactMechPromises.pop();
            contactMech = contactMechEntities.pop();
            purposeTypeId = contactMech.contactMechPurposeTypeId;
            return promise.then(function (contactMechId) {
                return contactMechController.linkContactMechToParty(partyId, contactMechId, purposeTypeId)
                    .then(function () {
                        return partyId;
                    });
            });
        }
    };

    /**
     * Add a new contact
     * @param {Object} contact - The new contact to be added
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is id of new contact
     */
    var addContact = function (contact, user) {

        // Check user's security permission to add contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_CREATE');
        if (hasPermission !== -1) {
            var now = (new Date()).toISOString();
            // Convert the received objects into entities (protect the data layer)
            //
            // Contact mechanisms
            var contactMechEntities = [];

            if (contact.emailAddress) {
                var emailContactMech = new ContactMech(
                    null,
                    'EMAIL_ADDRESS',
                    'PRIMARY_EMAIL',
                    contact.emailAddress,
                    now,
                    now
                );
                contactMechEntities.push(emailContactMech);
            }
            if (contact.webAddress) {
                var webContactMech = new ContactMech(
                    null,
                    'WEB_ADDRESS',
                    'PRIMARY_WEB_URL',
                    contact.webAddress,
                    now,
                    now
                );
                contactMechEntities.push(webContactMech);
            }
            if (contact.contactNumber) {
                var phoneContactMech = new ContactMech(
                    null,
                    'TELECOM_NUMBER',
                    'PRIMARY_PHONE',
                    null,
                    now,
                    now,
                    contact.countryCode,
                    contact.areaCode,
                    contact.contactNumber,
                    contact.askForName
                );
                contactMechEntities.push(phoneContactMech);
            }
            if (contact.countryGeoId) {
                var addressContactMech = new ContactMech(
                    null,
                    'POSTAL_ADDRESS',
                    'PRIMARY_LOCATION',
                    null,
                    now,
                    now,
                    null,
                    null,
                    null,
                    null,
                    contact.toName,
                    contact.attnName,
                    contact.address1,
                    contact.address2,
                    contact.directions,
                    contact.city,
                    contact.stateProvinceGeoId,
                    contact.zipOrPostalCode,
                    contact.countryGeoId
                );
                contactMechEntities.push(addressContactMech);
            }

            // Contact entity
            var contactEntity = new Contact(
                null,
                contact.partyTypeId,
                contact.preferredCurrencyUomId,
                contact.description,
                contact.statusId,
                user.userId,
                now,
                now,
                contact.salutation,
                contact.firstName,
                contact.middleName,
                contact.lastName,
                contact.birthDate,
                contact.comments
            );

            // Validate the contact and user data before going ahead
            var validationErrors = [];
            var contactValidationErrors = contactEntity.validateForInsert();
            //Errors are non-empty validation results
            for (var i = 0; i < contactValidationErrors.length; i++) {
                if (contactValidationErrors[i]) {
                    validationErrors.push(contactValidationErrors[i]);
                }
            }

            if (validationErrors.length === 0) {
                // Pass on the entities with info to be added to the data layer
                var promise = contactData.addContact(contactEntity, user);

                var addContactMechPromises = [];
                var mechPromise;
                for (var i = 0; i < contactMechEntities.length; i++) {
                    mechPromise = contactMechController.addContactMech(contactMechEntities[i]);
                    // Make sure we have promise,
                    // and not array of errors
                    if ('then' in mechPromise) {
                        addContactMechPromises.push(mechPromise);
                    }
                }
                promise.catch(function (error) {
                    winston.error(error);
                });

                if (addContactMechPromises.length > 0) {
                    return promise.then(function (partyId) {
                        return addContactMechCallback(addContactMechPromises, contactMechEntities, partyId);
                    });
                } else {
                    return promise;
                }
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions of a contact owner, return null
            return null;
        }
    };

    /**
     * Gets one contact by its id
     * @param {Number} contactId - Unique id of the contact to be fetched
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is a contact entity
     */
    var getContactById = function (contactId, user) {
        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_VIEW');
        if (hasPermission !== -1) {
            var promise = contactData.getContactById(contactId)
                .then(function (contacts) {
                    var contactEntity;
                    if (contacts.length > 0) {
                        // Map the retrieved result set to corresponding entity
                        contactEntity = new Contact(
                            contacts[0].party_id,
                            contacts[0].party_type_id,
                            contacts[0].preferred_currency_uom_id,
                            contacts[0].description,
                            contacts[0].status_id,
                            contacts[0].created_by,
                            contacts[0].created_date,
                            contacts[0].updated_date,
                            contacts[0].salutation,
                            contacts[0].first_name,
                            contacts[0].middle_name,
                            contacts[0].last_name,
                            contacts[0].birth_date,
                            contacts[0].comments
                        );

                        //get and attach contactMechs
                        return contactMechController.getContactMechsByParty(contactId)
                            .then(function (mechEntityArray) {
                                contactEntity.contactMechs = mechEntityArray;
                                return contactEntity;
                            });
                    } else {
                        contactEntity = new Contact();
                        return contactEntity;
                    }
                    //return contactEntity;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions of a contact owner, return null
            return null;
        }
    };

    /**
     * Gets contacts owned by the user/owner
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is an array of contact entities
     */
    var getContactsByOwner = function (user) {
        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_VIEW');
        if (hasPermission !== -1) {
            // user has permission, proceed to the data layer
            var promise = contactData.getContactsByOwner(user.partyId)
                .then(function (contacts) {
                    // Map the retrieved result set to corresponding entities
                    var contactEntities = [];
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = new Contact(
                            contacts[i].party_id,
                            contacts[i].party_type_id,
                            contacts[i].preferred_currency_uom_id,
                            contacts[i].description,
                            contacts[i].status_id,
                            contacts[i].created_by,
                            contacts[i].created_date,
                            contacts[i].updated_date,
                            contacts[i].salutation,
                            contacts[i].first_name,
                            contacts[i].middle_name,
                            contacts[i].last_name,
                            contacts[i].birth_date,
                            contacts[i].comments
                        );
                        contactEntities.push(contact);
                    }
                    return contactEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions of a contact owner, return null
            return null;
        }
    };

    /**
     * Gets contacts by identity (see opentaps' Find Contact feature)
     * @param {String} query - query string may contain firstName and/or lastName
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is an array of contact entities + phone info
     */
    var getContactsByIdentity = function (query, user) {
        // Check security permissions of user against accepted permissions for this function
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_VIEW');
        if (hasPermission !== -1) {
            // user has permission, proceed towards data layer

            // Declaring variables to hold incoming query string properties ensures that an undefined
            // value results in an empty string.
            var firstName = query.firstName;
            var lastName = query.lastName;

            var promise = contactData.getContactsByIdentity(firstName, lastName)
                .then(function (contacts) {

                    // Map the retrieved result set to corresponding entities
                    var contactEntities = [];
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = new Contact(
                            contacts[i].party_id,
                            contacts[i].party_type_id,
                            contacts[i].currency_uom_id,
                            contacts[i].description,
                            contacts[i].status_id,
                            contacts[i].created_by,
                            contacts[i].created_date,
                            contacts[i].updated_date,
                            contacts[i].salutation,
                            contacts[i].first_name,
                            contacts[i].middle_name,
                            contacts[i].last_name,
                            contacts[i].birth_date,
                            contacts[i].comments
                        );
                        contactEntities.push(contact);
                    }
                    return contactEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions of a contact owner, return null
            return null;
        }
    };

    /**
     * Gets contacts by phone number
     * @param {String} query - query string may contain contactNumber, countryCode and/or areaCode
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is an array of contact entities + phone info
     */
    var getContactsByPhoneNumber = function (query, user){
        // Check security permissions of user against accepted permissions for this function
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_VIEW');
        if (hasPermission !== -1){

            // function used below to combine the retrieved Contact(s) with phone number;
            // see:  https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
            var extend = function (obj, src) {
                for (var key in src) {
                    if (src.hasOwnProperty(key)) {
                        obj[key] = src[key]
                    };
                }
                return obj;
            };

            // Declaring variables to hold incoming query string properties ensures that an undefined
            // value results in an empty string.
            var contactNumber = query.contactNumber;
            var countryCode = query.countryCode;
            var areaCode = query.areaCode;

            var promise = contactData.getContactsByPhoneNumber(contactNumber, countryCode, areaCode)
                .then(function (contactsWithPhoneNum) {

                    // Map the retrieved result set to corresponding entities
                    var contactsRetrieved = [];
                    for (var i = 0; i < contactsWithPhoneNum.length; i++) {
                        var contact = new Contact(
                            contactsWithPhoneNum[i].party_id,
                            contactsWithPhoneNum[i].party_type_id,
                            contactsWithPhoneNum[i].currency_uom_id,
                            contactsWithPhoneNum[i].description,
                            contactsWithPhoneNum[i].status_id,
                            contactsWithPhoneNum[i].created_by,
                            contactsWithPhoneNum[i].created_date,
                            contactsWithPhoneNum[i].updated_date,
                            contactsWithPhoneNum[i].salutation,
                            contactsWithPhoneNum[i].first_name,
                            contactsWithPhoneNum[i].middle_name,
                            contactsWithPhoneNum[i].last_name,
                            contactsWithPhoneNum[i].birth_date,
                            contactsWithPhoneNum[i].comments
                        );
                        var contactMech = new ContactMech(
                            contactsWithPhoneNum[i].contact_mech_id,
                            contactsWithPhoneNum[i].contact_mech_type_id,
                            contactsWithPhoneNum[i].contact_mech_purpose_type_id,
                            contactsWithPhoneNum[i].info_string,
                            contactsWithPhoneNum[i].created_date,
                            contactsWithPhoneNum[i].updated_date,
                            contactsWithPhoneNum[i].country_code,
                            contactsWithPhoneNum[i].area_code,
                            contactsWithPhoneNum[i].contact_number,
                            contactsWithPhoneNum[i].ask_for_name,
                            contactsWithPhoneNum[i].to_name,
                            contactsWithPhoneNum[i].attn_name,
                            contactsWithPhoneNum[i].address1,
                            contactsWithPhoneNum[i].address2,
                            contactsWithPhoneNum[i].directions,
                            contactsWithPhoneNum[i].city,
                            contactsWithPhoneNum[i].state_province_geo_id,
                            contactsWithPhoneNum[i].zip_or_postal_code,
                            contactsWithPhoneNum[i].country_geo_id
                        );
                        contactsRetrieved.push( extend(contact, contactMech) );
                    }
                    return contactsRetrieved;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions of a contact owner, return null
            return null;
        }
    };

    /**
     * Update a contact in database
     * @param {Number} contactId - Unique id of the contact to be updated
     * @param {Object} contact - The object that contains updated data
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateContact = function (contactId, contact, user) {
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_CONTACT_UPDATE');
        var now = (new Date()).toISOString();

        if (hasPermission !== -1) {
            //Convert contact to entity
            var contactEntity = new Contact(
                contactId,
                contact.partyTypeId,
                contact.preferredCurrencyUomId,
                contact.description,
                contact.statusId,
                contact.createdBy,
                contact.createdDate,
                now, //contact.updatedDate,
                contact.salutation,
                contact.firstName,
                contact.middleName,
                contact.lastName,
                contact.birthDate,
                contact.comments
            );

            var validationErrors = contactEntity.validateForUpdate();
            if (validationErrors.length === 0) {
                // Pass on the entity to be added to the data layer
                var promise = contactData.updateContact(contactEntity, user);
                //.then(function (numRows) {
                //    return numRows;
                //});

                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            return null;
        }

    };

    /**
     * Delete a contact
     * @param {Number} contactId - Unique id of the contact to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteContact = function (contactId) {
        var promise = contactData.deleteContact(contactId)
            .then(function (result) {
                return result;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    return {
        getContactById: getContactById,
        getContactsByOwner: getContactsByOwner,
        getContactsByIdentity: getContactsByIdentity,
        getContactsByPhoneNumber: getContactsByPhoneNumber,
        addContact: addContact,
        updateContact: updateContact,
        deleteContact: deleteContact
    };
};

module.exports = contactController;