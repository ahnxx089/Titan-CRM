/////////////////////////////////////////////////
// Business logic module for contactMechs.
//
// @file:    contactMechController.js
// @authors: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var winston = require('winston');
var ContactMech = require('../entities/contactMech.js');

var contactMechController = function (knex) {
    // Get a reference to data layer module
    //
    var contactMechData = require('../data/contactMechData')(knex);

    /**
     * Add a new contact mechanism
     * @param {Object} contactMech - The new contact mechanism to be added
     * @return {Object} promise - Fulfillment value is id of new party
     */
    var addContactMech = function (contactMech) {
        // Convert the received object into an entity
        var contactMechEntity = new ContactMech(
            contactMech.contactMechId,
            contactMech.contactMechTypeId,
            contactMech.contactMechPurposeTypeId,
            contactMech.infoString, (new Date()).toISOString(), //created date
            (new Date()).toISOString(), //updated date
            contactMech.countryCode,
            contactMech.areaCode,
            contactMech.contactNumber,
            contactMech.askForName,
            contactMech.toName,
            contactMech.attnName,
            contactMech.address1,
            contactMech.address2,
            contactMech.directions,
            contactMech.city,
            contactMech.stateProvinceGeoId,
            contactMech.zipOrPostalCode,
            contactMech.countryGeoId
        );

        // Validate the data before going ahead
        var validationErrors = contactMechEntity.validateForInsert();
        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise;

            // logically it makes more sense if here we use the validated attribute, 
            // contactMechEntity.contactMechTypeId, instead of contactMech.contactMechTypeId
            if (contactMech.contactMechTypeId === 'TELECOM_NUMBER') {
                promise = contactMechData.addContactMechToGeneralTable(contactMechEntity)
                    .then(function (contactMechId) {
                        contactMechEntity.contactMechId = contactMechId;
                        return contactMechData.addContactMechToTelecomTable(contactMechEntity)
                            //function above should be returning contactMechId already
                            //why is it returning 0 instead?
                            .then(function () {
                                return contactMechId;
                            });
                    });
            } else if (contactMech.contactMechTypeId === 'POSTAL_ADDRESS') {
                promise = contactMechData.addContactMechToGeneralTable(contactMechEntity)
                    .then(function (contactMechId) {
                        contactMechEntity.contactMechId = contactMechId;
                        return contactMechData.addContactMechToPostalTable(contactMechEntity)
                            //function above should be returning contactMechId already
                            //why is it returning 0 instead?
                            .then(function () {
                                return contactMechId;
                            });
                    });
            } else {
                promise = contactMechData.addContactMechToGeneralTable(contactMechEntity) //;
                    // this is needed to avoid duplicate entries [WHY?]
                    .then(function (contactMechId) {
                        return contactMechId;
                    });
            }

            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return validationErrors;
        }
    };

    /**
     * Get all contact mechanisms in the database
     * @return {object) promise - An array of JSON objects representing contact mechanisms
     */
    var getContactMechs = function () {
        var promise = contactMechData.getContactMechs()
            .then(function (contactMechs) {
                // Map the retrieved result set to corresponding entities
                var contactMechEntities = [];
                for (var i = 0; i < contactMechs.length; i++) {
                    var contactMech = new ContactMech(
                        contactMechs[i].contactMechId,
                        contactMechs[i].contactMechTypeId,
                        contactMechs[i].contactMechPuproseTypeId,
                        contactMechs[i].infoString,
                        contactMechs[i].createdDate,
                        contactMechs[i].updatedDate,
                        contactMechs[i].countryCode,
                        contactMechs[i].areaCode,
                        contactMechs[i].contactNumber,
                        contactMechs[i].askForName,
                        contactMechs[i].toName,
                        contactMechs[i].attnName,
                        contactMechs[i].address1,
                        contactMechs[i].address2,
                        contactMechs[i].directions,
                        contactMechs[i].city,
                        contactMechs[i].stateProvinceGeoId,
                        contactMechs[i].zipOrPostalCode,
                        contactMechs[i].countryGeoId
                    );

                    contactMechEntities.push(contactMech);
                }
                return contactMechEntities;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Get a list of contact mechanisms associated with a particular party
     * @param {number} partyId - unique ID of the party
     * @return {object} - array of contact mechanisms
     */
    var getContactMechsByParty = function (partyId) {
        var promise = contactMechData.getContactMechsByParty(partyId)
            .then(function (contactMechs) {
                // Map the retrieved result set to corresponding entities
                var contactMechEntities = [];
                for (var i = 0; i < contactMechs.length; i++) {
                    var contactMech = new ContactMech(
                        contactMechs[i].contact_mech_id,
                        contactMechs[i].contact_mech_type_id,
                        contactMechs[i].contact_mech_purpose_type_id,
                        contactMechs[i].info_string,
                        contactMechs[i].created_date,
                        contactMechs[i].updated_date,
                        contactMechs[i].country_code,
                        contactMechs[i].area_code,
                        contactMechs[i].contact_number,
                        contactMechs[i].ask_for_name,
                        contactMechs[i].to_name,
                        contactMechs[i].attn_name,
                        contactMechs[i].address1,
                        contactMechs[i].address2,
                        contactMechs[i].directions,
                        contactMechs[i].city,
                        contactMechs[i].state_province_geo_id,
                        contactMechs[i].postal_code,
                        contactMechs[i].country_geo_id
                    );

                    contactMechEntities.push(contactMech);
                }
                return contactMechEntities;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };


    var getContactMechById = function (contactMechId) {
        var promise = contactMechData.getContactMechById(contactMechId)
            .then(function (contactMech) {
                // Map the retrieved result set to corresponding entity
                var contactMechEntity;
                if (contactMech.length > 0) {
                    contactMechEntity = new ContactMech(
                        contactMech[0].contact_mech_id,
                        contactMech[0].contact_mech_type_id,
                        contactMech[0].contact_mech_puprose_type_id,
                        contactMech[0].info_string,
                        contactMech[0].created_date,
                        contactMech[0].updated_date,
                        contactMech[0].country_code,
                        contactMech[0].area_code,
                        contactMech[0].contact_number,
                        contactMech[0].ask_for_name,
                        contactMech[0].to_name,
                        contactMech[0].attn_name,
                        contactMech[0].address1,
                        contactMech[0].address2,
                        contactMech[0].directions,
                        contactMech[0].city,
                        contactMech[0].state_province_geo_id,
                        contactMech[0].zip_or_postal_code,
                        contactMech[0].country_geoId
                    );
                }
                return contactMechEntity;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Update a contact mechanism in database
     * @param {Number} contactMechId - Unique id of the contact to be updated
     * @param {Object} contact - The object that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateContactMech = function (contactMechId, contactMech) {
        var now = (new Date()).toISOString();

        var contactMechEntity = new ContactMech(
            contactMechId,
            contactMech.contactMechTypeId,
            contactMech.contactMechPurposeTypeId,
            contactMech.infoString,
            contactMech.createdDate,
            now, //updated date
            contactMech.countryCode,
            contactMech.areaCode,
            contactMech.contactNumber,
            contactMech.askForName,
            contactMech.toName,
            contactMech.attnName,
            contactMech.address1,
            contactMech.address2,
            contactMech.directions,
            contactMech.city,
            contactMech.stateProvinceGeoId,
            contactMech.zipOrPostalCode,
            contactMech.countryGeoId
        );

        // Validate the data before going ahead
        var validationErrors = contactMechEntity.validateForUpdate();

        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise = contactMechData.updateContactMech(contactMechEntity);
            //.then(function (contactMechId) {
            //    return contactMechId;
            //});
            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return null;
        }
    };

    /**
     * Delete a contact mechanism
     * @param {Number} contactMechId - Unique id of the contact mechanism to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteContactMech = function (contactMechId) {
        var promise = contactMechData.deleteContactMech(contactMechId)
            .then(function (result) {
                return result;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    var linkContactMechToParty = function (partyId, contactMechId, purposeTypeId) {

        var promise = contactMechData.linkContactMechToParty(partyId, contactMechId, purposeTypeId)
            .then(function () {
                return partyId;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;

    };

    return {
        addContactMech: addContactMech,
        getContactMechs: getContactMechs,
        getContactMechsByParty: getContactMechsByParty,
        getContactMechById: getContactMechById,
        updateContactMech: updateContactMech,
        deleteContactMech: deleteContactMech,
        linkContactMechToParty: linkContactMechToParty
    };
};

module.exports = contactMechController;