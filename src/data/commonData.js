/////////////////////////////////////////////////
// Data access layer module for common data.
//
// @file:   commonData.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var commonData = function (knex) {

    /**
     * Gets all currency UOM units from database
     * @return {Object} promise - Fulfillment value is an array of UOM rows for currencies
     */
    var getAllCurrencies = function () {
        return knex.select('uom_id', 'abbreviation', 'description')
            .from('uom')
            .where({
                uom_type_id: 'CURRENCY_MEASURE'
            })
            .orderBy('description');
    };

    /**
     * Gets all state or province Geo units from database
     * @return {Object} promise - Fulfillment value is an array of Geo rows for countries
     */
    var getAllStatesOrProvinces = function () {
        return knex.select('geo_id', 'abbreviation', 'geo_name')
            .from('geo')
            .where({
                geo_type_id: 'STATE'
            })
            .orWhere({
                geo_type_id: 'PROVINCE'
            })
            .orderBy('geo_name');
    };


    /**
     * Gets all country Geo units from database
     * @return {Object} promise - Fulfillment value is an array of Geo rows for countries
     */
    var getAllCountries = function () {
        return knex.select('geo_id', 'abbreviation', 'geo_name')
            .from('geo')
            .where({
                geo_type_id: 'COUNTRY'
            })
            .orderBy('geo_name');
    };

    /**
     * Gets all quote_type_id values from database
     * @return {Object} promise - Fulfillment value is an array of quoteTypes
     */
    var getQuoteTypes = function () {
        return knex.select('quote_type_id', 'description').from('quote_type').orderBy('quote_type_id');
    };

    /**
     * Gets all quote_status_id values from database
     * @return {Object} promise - Fulfillment value is an array of quoteStatusId
     */
    var getQuoteStatusIds = function () {
        return knex.select('status_id').from('status_item').where('status_id','like','QUOTE_%');
    };

    /**
     * Gets all party_id values from database where party_role.role_type_id = 'ACCOUNT'
     * @return {Object} promise - Fulfillment value is an array of party_ids for Accounts (only)
     */
    var getAccountParties = function () {
        return knex.select('party_role.party_id').from('party_role').where('role_type_id', 'ACCOUNT');
    };

    /**
     * Gets all party_id values from database where party_role.role_type_id = 'CONTACT'
     * @return {Object} promise - Fulfillment value is an array of party_ids for Contacts (only), with names
     */
    var getContactParties = function () {
        return knex.select('party_role.party_id', 'person.first_name', 'person.last_name')
            .from('party_role')
            .innerJoin('person', 'party_role.party_id', 'person.party_id')
            .where('party_role.role_type_id', 'CONTACT');
    };

    /**
     * Gets all sales channel enum values from database
     * @return {Object} promise - Fulfillment value is an array of enumeration.enum_id values
     */
    var getSalesChannels = function () {
        return knex.select('enumeration.enum_id', 'enumeration.description')
            .from('enumeration')
            .where('enumeration.enum_type_id', 'PARTY_INDUSTRY');
    };

    /**
     * Gets all products from database
     * @return {Object} promise - Fulfillment value is an array of product.product_id values
     */
    var getProducts = function () {
        return knex.select('product_id')
            .from('product');
    };
    /**
     * Gets all ownership enum values from database
     * @return {Object} promise - Fulfillment value is an array of enumeration.enum_id values
     */
    var getOwnerships = function () {
        return knex.select('enumeration.enum_id', 'enumeration.description')
            .from('enumeration')
            .where('enumeration.enum_type_id', 'PARTY_OWNERSHIP');
    };

    var getContactMechType = function () {
        return knex.select('contact_mech_type_id', 'description')
            .from('contact_mech_type');
    };

    var getContactMechPurposeType = function () {
        return knex.select('contact_mech_purpose_type_id', 'description')
            .from('contact_mech_purpose_type');
    };

    return {
        getAllCurrencies: getAllCurrencies,
        getAllStatesOrProvinces: getAllStatesOrProvinces,
        getAllCountries: getAllCountries,
        getQuoteTypes: getQuoteTypes,
        getQuoteStatusIds: getQuoteStatusIds,
        getAccountParties: getAccountParties,
        getContactParties: getContactParties,
        getSalesChannels: getSalesChannels,
        getProducts: getProducts,
        getOwnerships: getOwnerships,
        getContactMechType: getContactMechType,
        getContactMechPurposeType: getContactMechPurposeType
    };
};

module.exports = commonData;