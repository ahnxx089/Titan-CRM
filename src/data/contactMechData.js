/////////////////////////////////////////////////
// Data access layer module for contact mechanisms.
//
// @file:    contactMechData.js
// @authors: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var contactMechData = function (knex) {


    /**
     * Add a new contact in database
     * @param {Object} contact - The new contact entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addContactMechToGeneralTable = function (contactMech) {
        return knex.insert({
                contact_mech_type_id: contactMech.contactMechTypeId,
                info_string: contactMech.infoString,
                created_date: (new Date()).toISOString(),
                updated_date: (new Date()).toISOString()
            })
            .into('contact_mech')
            .then(function (idArray) {
                return idArray[0];
            });
    };

    /**
     * Add a new contact in database
     * @param {Object} contact - The new contact entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addContactMechToPostalTable = function (contactMech) {
        return knex.insert({
                contact_mech_id: contactMech.contactMechId,
                to_name: contactMech.toName,
                attn_name: contactMech.attnName,
                address1: contactMech.address1,
                address2: contactMech.address2,
                directions: contactMech.directions,
                city: contactMech.city,
                postal_code: contactMech.zipOrPostalCode,
                country_geo_id: contactMech.countryGeoId,
                state_province_geo_id: contactMech.stateProvinceGeoId,
                created_date: (new Date()).toISOString(),
                updated_date: (new Date()).toISOString()
            })
            .into('postal_address')
            .then(function (idArray) {
                return idArray[0];
            });
    };


    /**
     * Add a new contact in database
     * @param {Object} contact - The new contact entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addContactMechToTelecomTable = function (contactMech) {
        return knex.insert({
                contact_mech_id: contactMech.contactMechId,
                country_code: contactMech.countryCode,
                area_code: contactMech.areaCode,
                contact_number: contactMech.contactNumber,
                ask_for_name: contactMech.askForName,
                created_date: (new Date()).toISOString(),
                updated_date: (new Date()).toISOString()
            })
            .into('telecom_number')
            .then(function (idArray) {
                return idArray[0];
            });
    };

    /**
     * Gets all contact mechanisms from database
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getContactMechs = function () {
        return knex.select('contact_mech.contact_mech_id', 'contact_mech.contact_mech_type_id', 'contact_mech.info_string',
                'contact_mech.created_date', 'contact_mech.updated_date', 'telecom_number.country_code',
                'telecom_number.area_code', 'telecom_number.contact_number', 'telecom_number.ask_for_name',
                'postal_address.to_name', 'postal_address.attn_name', 'postal_address.address1',
                'postal_address.address2', 'postal_address.directions', 'postal_address.city',
                'postal_address.postal_code', 'postal_address.country_geo_id', 'postal_address.state_province_geo_id')
            .from('contact_mech')
            .leftJoin('telecom_number', 'contact_mech.contact_mech_id', '=', 'telecom_number.contact_mech_id')
            .leftJoin('postal_address', 'contact_mech.contact_mech_id', '=', 'postal_address.contact_mech_id');
    };


    /**
     * Gets all contact mechanisms from database
     * @partyId
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getContactMechsByParty = function (partyId) {
        return knex.select('contact_mech.contact_mech_id', 'contact_mech.contact_mech_type_id', 'contact_mech.info_string',
                'contact_mech.created_date', 'contact_mech.updated_date', 'telecom_number.country_code',
                'telecom_number.area_code', 'telecom_number.contact_number', 'telecom_number.ask_for_name',
                'postal_address.to_name', 'postal_address.attn_name', 'postal_address.address1',
                'postal_address.address2', 'postal_address.directions', 'postal_address.city',
                'postal_address.postal_code', 'postal_address.country_geo_id', 'postal_address.state_province_geo_id',
                'party_contact_mech.contact_mech_purpose_type_id')
            .from('party_contact_mech')
            .leftJoin('contact_mech', 'party_contact_mech.contact_mech_id', '=', 'contact_mech.contact_mech_id')
            .leftJoin('telecom_number', 'contact_mech.contact_mech_id', '=', 'telecom_number.contact_mech_id')
            .leftJoin('postal_address', 'contact_mech.contact_mech_id', '=', 'postal_address.contact_mech_id')
            .where({
                'party_contact_mech.party_id': partyId
            });
    };



    /**
     * Gets one contact mechanism by its id from database
     * @param {Number} contactMechId - Unique id of the contact to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getContactMechById = function (id) {
        return knex.select('contact_mech.contact_mech_id', 'contact_mech.contact_mech_type_id', 'contact_mech.info_string',
                'contact_mech.created_date', 'contact_mech.updated_date', 'telecom_number.country_code',
                'telecom_number.area_code', 'telecom_number.contact_number', 'telecom_number.ask_for_name',
                'postal_address.to_name', 'postal_address.attn_name', 'postal_address.address1',
                'postal_address.address2', 'postal_address.directions', 'postal_address.city',
                'postal_address.postal_code', 'postal_address.country_geo_id', 'postal_address.state_province_geo_id')
            .from('contact_mech')
            .leftJoin('telecom_number', 'contact_mech.contact_mech_id', '=', 'telecom_number.contact_mech_id')
            .leftJoin('postal_address', 'contact_mech.contact_mech_id', '=', 'postal_address.contact_mech_id')
            .where({
                'contact_mech.contact_mech_id': id
            });
    };

    /**
     * Update a contact in database
     * @param {Object} contactMech - The contactMech entity that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateContactMech = function (contactMech) {
        var telecomNumberFields = {
            country_code: contactMech.countryCode,
            area_code: contactMech.areaCode,
            contact_number: contactMech.contactNumber,
            ask_for_name: contactMech.askForName,
            updated_date: (new Date()).toISOString()
        };
        var postalAddressFields = {
            to_name: contactMech.toName,
            attn_name: contactMech.attnName,
            address1: contactMech.address1,
            address2: contactMech.address2,
            directions: contactMech.directions,
            city: contactMech.city,
            postal_code: contactMech.zipOrPostalCode,
            country_geo_id: contactMech.countryGeoId,
            state_province_geo_id: contactMech.stateProvinceGeoId,
            updated_date: (new Date()).toISOString()
        };
        var generalContactMechFields = {
            contact_mech_type_id: contactMech.contctMechTypeId,
            info_string: contactMech.infoString,
            updated_date: (new Date()).toISOString()
        };

        return knex('telecom_number')
            .where({
                contact_mech_id: contactMech.contactMechId
            })
            .update(telecomNumberFields)
            .then(function (telecomRows) {
                return knex('postal_address')
                    .where({
                        contact_mech_id: contactMech.contactMechId
                    })
                    .update(postalAddressFields)
                    .then(function (postalRows) {
                        return knex('contact_mech')
                            .where({
                                contact_mech_id: contactMech.contactMechId
                            })
                            .update(generalContactMechFields)
                            .then(function (standardRows) {
                                return telecomRows + postalRows + standardRows;
                            });
                    });
            });
    };

    /**
     * Delete a contact from database
     * @param {Number} contactMechId - Unique id of the contact mechanism to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteContactMech = function (contactMechId) {
        return knex('telecom_number')
            .where({
                contact_mech_id: contactMechId
            })
            .del()
            .then(function (telecomRows) {
                return knex('postal_address')
                    .where({
                        contact_mech_id: contactMechId
                    })
                    .del()
                    .then(function (postalRows) {
                        return knex('party_contact_mech')
                            .where({
                                contact_mech_id: contactMechId
                            })
                            .del()
                            .then(function (partyLinkRows) {
                                return knex('contact_mech')
                                    .where({
                                        contact_mech_id: contactMechId
                                    })
                                    .del()
                                    .then(function (standardRows) {
                                        return telecomRows + postalRows + standardRows + partyLinkRows;
                                    });
                            });

                    });
            });
    };

    var linkContactMechToParty = function (partyId, contactMechId, purposeTypeId) {
        return knex.insert({
                party_id: partyId,
                contact_mech_id: contactMechId,
                contact_mech_purpose_type_id: purposeTypeId,
                from_date: (new Date()).toISOString(),
                thru_date: null,
                verified: null,
                comments: null,
                created_date: (new Date()).toISOString(),
                updated_date: (new Date()).toISOString()
            })
            .into('party_contact_mech');
    };

    return {
        addContactMechToGeneralTable: addContactMechToGeneralTable,
        addContactMechToTelecomTable: addContactMechToTelecomTable,
        addContactMechToPostalTable: addContactMechToPostalTable,
        getContactMechs: getContactMechs,
        getContactMechsByParty: getContactMechsByParty,
        getContactMechById: getContactMechById,
        updateContactMech: updateContactMech,
        deleteContactMech: deleteContactMech,
        linkContactMechToParty: linkContactMechToParty
    };
};

module.exports = contactMechData;