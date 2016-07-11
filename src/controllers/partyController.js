/////////////////////////////////////////////////
// Business logic module for parties.
//
// @file:   partyController.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var winston = require('winston');
var Party = require('../entities/party');

var partyController = function (knex) {
    // Get a reference to data layer module
    //
    var partyData = require('../data/partyData')(knex);


    // CONTROLLER METHODS
    // ==========================================
    //
    /**
     * Add a new party
     * @param {Object} party - The new party to be added
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is id of new party
     */
    var addParty = function (party, user) {
        // Convert the received object into an entity
        var partyEntity = new Party(
            null,
            party.partyTypeId,
            party.preferredCurrencyUomId,
            party.description,
            party.statusId,
            user.userId,
            (new Date()).toISOString(), (new Date()).toISOString()
        );
        // Validate the data before going ahead
        var validationErrors = partyEntity.validateForInsert();
        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise = partyData.addParty(partyEntity)
                .then(function (partyId) {
                    return partyId;
                });
            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return validationErrors;
        }
    };

    /**
     * Gets all parties
     * @return {Object} promise - Fulfillment value is an array of party entities
     */
    var getParties = function () {
        var promise = partyData.getParties()
            .then(function (parties) {
                // Map the retrieved result set to corresponding entities
                var partyEntities = [];
                for (var i = 0; i < parties.length; i++) {
                    var party = new Party();
                    party.partyId = parties[i].party_id;
                    party.partyTypeId = parties[i].party_type_id;
                    party.preferredCurrencyUomId = parties[i].preferred_currency_uom_id;
                    party.description = parties[i].description;
                    party.statusId = parties[i].status_id;
                    party.createdBy = parties[i].created_by;
                    party.createdDate = parties[i].created_date;
                    party.updatedDate = parties[i].updated_date;
                    partyEntities.push(party);
                }
                return partyEntities;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Gets one party by its id
     * @param {Number} partyId - Unique id of the party to be fetched
     * @return {Object} promise - Fulfillment value is a party entity
     */
    var getPartyById = function (partyId) {
        var promise = partyData.getPartyById(partyId)
            .then(function (parties) {
                // Map the retrieved result set to corresponding entity
                var partyEntity;
                if (parties.length > 0) {
                    partyEntity = new Party(
                        parties[0].party_id,
                        parties[0].party_type_id,
                        parties[0].preferred_currency_uom_id,
                        parties[0].description,
                        parties[0].status_id,
                        parties[0].created_by,
                        parties[0].created_date,
                        parties[0].updated_date
                    );
                }
                return partyEntity;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Update a party in database
     * @param {Number} partyId - Unique id of the party to be updated
     * @param {Object} party - The object that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateParty = function (partyId, party) {
        // Convert the received object into an entity
        var partyEntity = new Party(
            partyId,
            party.partyTypeId,
            party.preferredCurrencyUomId,
            party.description,
            party.statusId,
            null,
            null, (new Date()).toISOString()
        );
        // Validate the data before going ahead
        var validationErrors = partyEntity.validateForUpdate();
        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise = partyData.updateParty(partyEntity)
                .then(function (partyId) {
                    return partyId;
                });
            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return null;
        }
    };

    /**
     * Delete a party
     * @param {Number} partyId - Unique id of the party to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteParty = function (partyId) {
        var promise = partyData.deleteParty(partyId)
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
        getParties: getParties,
        getPartyById: getPartyById,
        addParty: addParty,
        updateParty: updateParty,
        deleteParty: deleteParty
    };
};

module.exports = partyController;