/////////////////////////////////////////////////
// Data access layer module for parties.
//
// @file:   partyData.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var partyData = function(knex) {
    
    /**
     * Add a new party in database
     * @param {Object} party - The new party entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
    */
    var addParty = function(party) {
        return knex.insert({
            party_type_id: party.partyTypeId,
            preferred_currency_uom_id: party.preferredCurrencyUomId,
            description: party.description,
            status_id: party.statusId,
            created_by: party.createdBy,
            created_date: party.createdDate,
            updated_date: party.updatedDate
        })
        .into('party');
    };
    
    /**
     * Gets all parties from database
     * @return {Object} promise - Fulfillment value is an array of raw data objects
    */
    var getParties = function() {
        return knex.select('party_id', 'party_type_id', 'preferred_currency_uom_id', 'description', 'status_id', 'created_by', 'created_date', 'updated_date')
            .from('party');
    };
    
    /**
     * Gets one party by its id from database
     * @param {Number} partyId - Unique id of the party to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
    */
    var getPartyById = function(id) {
        return knex.select('party_id', 'party_type_id', 'preferred_currency_uom_id', 'description', 'status_id', 'created_by', 'created_date', 'updated_date')
            .from('party')
            .where({party_id: id});
    };
    
    /**
     * Update a party in database
     * @param {Object} party - The party entity that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
    */
    var updateParty = function(party) {
        return knex('party')
            .where({party_id: party.partyId})
            .update({
                party_type_id: party.partyTypeId,
                preferred_currency_uom_id: party.preferredCurrencyUomId,
                description: party.description,
                status_id: party.statusId,
                updated_date: (new Date()).toISOString()
            });
    };
    
    /**
     * Delete a party from database
     * @param {Number} partyId - Unique id of the party to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
    */
    var deleteParty = function(partyId) {
        return knex('party')
            .where({party_id: partyId})
            .del();
    };
    
    return {
        addParty: addParty,
        getParties: getParties,
        getPartyById: getPartyById,
        updateParty: updateParty,
        deleteParty: deleteParty
    };
};

module.exports = partyData;