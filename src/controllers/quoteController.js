/////////////////////////////////////////////////
// Business logic module for contacts.
//
// @file:    contactController.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
//           William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */
/* jshint maxcomplexity: false */
/* jshint shadow:true */

var winston = require('winston');
var Quote = require('../entities/quote');
var QuoteItem = require('../entities/quoteItem');
var QuoteItemOption = require('../entities/quoteItemOption');
var _ = require('lodash');
var validation = require('../common/validation')();

var quoteController = function (knex) {
    // Get a reference to data layer module
    //
    var quoteData = require('../data/quoteData')(knex);

    // CONTROLLER METHODS
    // ==========================================
    //

    /**
     * Add a new quote
     * @param {Object} quote - The new quote to be added
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is id of new contact
     */
    var addQuote = function (quote, user) {
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            var now = (new Date()).toISOString();
            var quoteEntity = new Quote(
                null,
                quote.quoteTypeId,
                quote.partyId,
                now,
                'QUOTE_CREATED',
                quote.currencyUomId,
                quote.salesChannelEnumId,
                quote.validFromDate,
                quote.validThruDate,
                quote.quoteName,
                quote.description,
                quote.contactPartyId,
                user.partyId,
                now,
                now
            );

            // Validate the quoteItem data before going ahead
            var validationErrors = [];
            var quoteValidationErrors = quoteEntity.validateForInsert();
            for (var i = 0; i < quoteValidationErrors.length; i++) {
                if (quoteValidationErrors[i]) {
                    validationErrors.push(quoteValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity to be added to the data layer
                var promise = quoteData.addQuote(quoteEntity)
                    .then(function (quoteId) {
                        return quoteId; //quoteData.addQuoteRole(quoteId);
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });

                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Add a new item to a quote
     * @param {Object} quoteItem - entity containing item to add onto a quote
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows added
     */
    var addQuoteItem = function (quoteItem, user) {

        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // proceed towards data layer
            var now = (new Date()).toISOString();

            // QuoteItem entity
            var quoteItemEntity = new QuoteItem(
                quoteItem.quoteId,
                quoteItem.quoteItemSeqId,
                quoteItem.productId,
                quoteItem.quantity,
                quoteItem.selectedAmount,
                quoteItem.quoteUnitPrice,
                quoteItem.estimatedDeliveryDate,
                quoteItem.comments,
                quoteItem.isPromo,
                quoteItem.description,
                now,
                now
            );

            // Validate the quoteItem data before going ahead
            var validationErrors = [];
            var quoteItemValidationErrors = quoteItemEntity.validateForInsert();
            //Errors are non-empty validation results
            for (var i = 0; i < quoteItemValidationErrors.length; i++) {
                if (quoteItemValidationErrors[i]) {
                    validationErrors.push(quoteItemValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity to the data layer, which returns an object holding
                // a RowDataPacket. A RowDataPacket is an object holding one key-value pair.  The key
                // is called 'count(*)'.  The value is the count of the number of rows inserted into
                // the quote_item table.
                var promise = quoteData.addQuoteItem(quoteItemEntity)
                    .then(function (objectHoldingRDP) {
                        var numRowsInserted = objectHoldingRDP[0][0]['count(*)'];
                        return numRowsInserted;
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Add a new option to an item of a quote
     * @param {Object} quoteItemOption - entity containing option to add to an item of a quote
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows added
     */
    var addQuoteItemOption = function (quoteItemOption, user) {
        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // proceed towards data layer
            var now = (new Date()).toISOString();

            // QuoteItem entity
            var quoteItemOptionEntity = new QuoteItemOption(
                quoteItemOption.quoteId,
                quoteItemOption.quoteItemSeqId,
                quoteItemOption.quoteItemOptionSeqId,
                quoteItemOption.quantity,
                quoteItemOption.quoteUnitPrice,
                now,
                now
            );

            // Validate the quoteItem data before going ahead
            var validationErrors = [];
            var quoteItemValidationErrors = quoteItemOptionEntity.validateForInsert();
            //Errors are non-empty validation results
            for (var i = 0; i < quoteItemValidationErrors.length; i++) {
                if (quoteItemValidationErrors[i]) {
                    validationErrors.push(quoteItemValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity to the data layer, which returns an object holding
                // a RowDataPacket. A RowDataPacket is an object holding one key-value pair.  The key
                // is called 'count(*)'.  The value is the count of the number of rows inserted into
                // the quote_item table.
                var promise = quoteData.addQuoteItemOption(quoteItemOptionEntity)
                    .then(function (objectHoldingRDP) {
                        var numRowsInserted = objectHoldingRDP[0][0]['count(*)'];
                        return numRowsInserted;
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Update a quote in database (equiv to Opentaps' Edit Quote & Accept/Send/Finalize/Reject/Cancel)
     * @param {Number} quoteId - Unique quote_id of the quote to update
     * @param {Object} quote - The object that contains the item to update quote with
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateQuote = function (quoteId, quote, user) {

        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // proceed towards data layer
            var now = (new Date()).toISOString();

            // build Quote Entity.  (Reminder to self on how issue_date and created_by column will not
            // be affected:  UI will be filling quote.issueDate and quote.createdDate with the value that this
            // quote already has.  Only updated_date column is receiving new value called "now")
            var quoteEntity = new Quote(
                quoteId,
                quote.quoteTypeId,
                quote.partyId,
                quote.issueDate,
                quote.statusId,
                quote.currencyUomId,
                quote.salesChannelEnumId,
                quote.validFromDate,
                quote.validThruDate,
                quote.quoteName,
                quote.description,
                quote.contactPartyId,
                quote.createdByPartyId,
                quote.createdDate,
                now
            );

            // Validate the quote data before going ahead
            var validationErrors = [];
            var quoteValidationErrors = quoteEntity.validateForUpdate();
            //Errors are non-empty validation results
            for (var i = 0; i < quoteValidationErrors.length; i++) {
                if (quoteValidationErrors[i]) {
                    validationErrors.push(quoteValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity by the data layer, which returns an object holding
                // a RowDataPacket. A RowDataPacket is an object holding one key-value pair.  The key
                // is called 'count(*)'.  The value is the count of the number of rows updated in
                // the quote table.
                var promise = quoteData.updateQuote(quoteEntity)
                    .then(function (objectHoldingRDP) {
                        var numRowsUpdated = objectHoldingRDP[0][0]['count(*)'];
                        return numRowsUpdated;
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Update an item of a quote
     * @param {Object} quoteItem - entity containing info of item to be updated
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateQuoteItem = function (quoteItem, user) {

        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // proceed towards data layer
            var now = (new Date()).toISOString();

            // QuoteItem entity
            var quoteItemEntity = new QuoteItem(
                quoteItem.quoteId,
                quoteItem.quoteItemSeqId,
                quoteItem.productId,
                quoteItem.quantity,
                quoteItem.selectedAmount,
                quoteItem.quoteUnitPrice,
                quoteItem.estimatedDeliveryDate,
                quoteItem.comments,
                quoteItem.isPromo,
                quoteItem.description,
                quoteItem.createdDate,
                now
            );

            // Validate the quoteItem data before going ahead
            var validationErrors = [];
            var quoteItemValidationErrors = quoteItemEntity.validateForUpdate();
            //Errors are non-empty validation results
            for (var i = 0; i < quoteItemValidationErrors.length; i++) {
                if (quoteItemValidationErrors[i]) {
                    validationErrors.push(quoteItemValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity to the data layer, which returns an object holding
                // a RowDataPacket. A RowDataPacket is an object holding one key-value pair.  The key
                // is called 'count(*)'.  The value is the count of the number of rows updated in
                // the quote_item table.
                var promise = quoteData.updateQuoteItem(quoteItemEntity)
                    .then(function (objectHoldingRDP) {
                        var numRowsUpdated = objectHoldingRDP[0][0]['count(*)'];
                        return numRowsUpdated;
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Update an option of an item of a quote
     * @param {Object} quoteItemOption - entity containing info of option of item to be updated
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateQuoteItemOption = function (quoteItemOption, user) {
        // Check user's security permission to own contacts
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // proceed towards data layer
            var now = (new Date()).toISOString();

            // QuoteItem entity
            var quoteItemOptionEntity = new QuoteItemOption(
                quoteItemOption.quoteId,
                quoteItemOption.quoteItemSeqId,
                quoteItemOption.quoteItemOptionSeqId,
                quoteItemOption.quantity,
                quoteItemOption.quoteUnitPrice,
                quoteItemOption.createdDate,
                now
            );

            // Validate the quoteItem data before going ahead
            var validationErrors = [];
            var quoteItemValidationErrors = quoteItemOptionEntity.validateForUpdate();
            //Errors are non-empty validation results
            for (var i = 0; i < quoteItemValidationErrors.length; i++) {
                if (quoteItemValidationErrors[i]) {
                    validationErrors.push(quoteItemValidationErrors[i]);
                }
            }
            if (validationErrors.length === 0) {
                // Pass on the entity to be added to the data layer
                var promise = quoteData.updateQuoteItemOption(quoteItemOptionEntity)
                    .then(function (objectHoldingRDP) {
                        var numRowsUpdated = objectHoldingRDP[0][0]['count(*)'];
                        return numRowsUpdated;
                    });
                promise.catch(function (error) {
                    winston.error(error);
                });
                return promise;
            } else {
                return validationErrors;
            }
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Gets one quote by its id
     * @param {Number} quoteId - Unique id of the quote to be fetched
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is a quote entity
     */
    var getQuoteById = function (quoteId, user) {
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            var promise = quoteData.getQuoteById(quoteId)
                .then(function (quote) {
                    // Map the retrieved result set to corresponding entity
                    var quoteEntity;
                    if (quote.length > 0) {
                        quoteEntity = new Quote(
                            quote[0].quote_id,
                            quote[0].quote_type_id,
                            quote[0].party_id,
                            quote[0].issue_date,
                            quote[0].status_id,
                            quote[0].currency_uom_id,
                            quote[0].sales_channel_enum_id,
                            quote[0].valid_from_date,
                            quote[0].valid_thru_date,
                            quote[0].quote_name,
                            quote[0].description,
                            quote[0].contact_party_id,
                            quote[0].created_by_party_id,
                            quote[0].created_date,
                            quote[0].updated_date
                        );
                    }
                    return quoteEntity;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    /**
     * Gets quotes owned by the user/owner
     * @return {Object} promise - Fulfillment value is an array of quote entities
     */
    var getQuotesByOwner = function (user) {
        // Check user's security permission to own quotes
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {
            // user has permission, proceed to the data layer
            var promise = quoteData.getQuotesByOwner(user.partyId)
                .then(function (quotes) {
                    // Map the retrieved result set to corresponding entities
                    var quoteEntities = [];
                    for (var i = 0; i < quotes.length; i++) {
                        var quote = new Quote(
                            quotes[i].quote_id,
                            quotes[i].quote_type_id,
                            quotes[i].party_id,
                            quotes[i].issue_date,
                            quotes[i].status_id,
                            quotes[i].currency_uom_id,
                            quotes[i].sales_channel_enum_id,
                            quotes[i].valid_from_date,
                            quotes[i].valid_thru_date,
                            quotes[i].quote_name,
                            quotes[i].description,
                            quotes[i].contact_party_id,
                            quotes[i].created_by_party_id,
                            quotes[i].created_date,
                            quotes[i].updated_date
                        );
                        quoteEntities.push(quote);
                    }
                    return quoteEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions of a quote owner, return null
            return null;
        }
    };

    /**
     * Gets all Items of a Quote
     * @param {Number} quoteId - Unique quote_id of the Quote whose Items are to be fetched
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is a quote entity
     */
    var getQuoteItems = function (query, user) {
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1){

            var quoteIdForItems = query.quoteIdForItems;

            var promise = quoteData.getQuoteItems(quoteIdForItems)
                .then(function (quoteItems) {
                    // Map the retrieved result set to corresponding entity
                    var quoteItemEntities = [];
                    for (var i = 0; i < quoteItems.length; i++)  {
                        var quoteItemEntity = new QuoteItem(
                            quoteItems[i].quote_id,
                            quoteItems[i].quote_item_seq_id,
                            quoteItems[i].product_id,
                            quoteItems[i].quantity,
                            quoteItems[i].selected_amount,
                            quoteItems[i].quote_unit_price,
                            quoteItems[i].estimated_delivery_date,
                            quoteItems[i].comments,
                            quoteItems[i].is_promo,
                            quoteItems[i].description,
                            quoteItems[i].created_date,
                            quoteItems[i].updated_date
                        );
                        quoteItemEntities.push(quoteItemEntity);
                    }
                    return quoteItemEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            // user does not have permissions to add a quote, return null
            return null;
        }
    };

    // Author: Lucas
    // This function is not used, and deactivated.
    /**
     * Gets quotes by advanced search (alternative version)
     * @param {String} query - query string: SOME ARGUMENT
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is an array of quote entities
     */
    var getQuotesByAdvancedAlt = function (query, user) {
        //Check security permission of user
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {

            // these variables are strings if were set, or object if null
            var quoteId = query.quoteId || null;
            var quoteName = query.quoteName || null;
            var status = query.status || null;
            var account = query.account || null;
            var salesChannel = query.salesChannel || null;

            var promise = quoteData.getQuotesByAdvanced(quoteId, quoteName, status, account, salesChannel)
                .then(function (quotes) {
                    var quoteEntities = [];
                    for (var i = 0; i < quotes.length; i++) {

                        // quotes[i].quote_id is Number
                        var test1 = quoteId == null ? true : quotes[i].quote_id === +quoteId; // + is the number conversion


                        // quotes[i].quote_name is varchar(100), and is NULLABLE
                        var emptyString = quoteName == null;
                        var emptyColumn = quotes[i].quote_name == null;
                        // If we search for something, in null columns, then we will never find it
                        var test2 = (!emptyString && emptyColumn) ? false : true;
                        // If we search for something, in some columns, we need to compare
                        // the first attempt is to do complete string match, the second attempt is to do substring match.
                        test2 = (!emptyString && !emptyColumn) ? (quotes[i].quote_name.toUpperCase().indexOf(quoteName.toUpperCase()) > -1) : test2;


                        // quotes[i].status_id is varchar(20), and is NULLABLE
                        // status_id will be shown in a drop-down menu. There is no need to do substring match here.
                        emptyString = status == null;
                        emptyColumn = quotes[i].status_id == null;
                        // console.log(emptyString);
                        // console.log(emptyColumn);
                        // If we search for something, in null columns, then we will never find it
                        var test3 = (!emptyString && emptyColumn) ? false : true;
                        // If we search for something, in some columns, we need to compare
                        test3 = (!emptyString && !emptyColumn) ? quotes[i].status_id.toUpperCase() === status.toUpperCase() : test3;
                        // The line above is same as
                        //if(!emptyString && !emptyColumn) {
                        //    test3 = quotes[i].status_id.toUpperCase() === status.toUpperCase();
                        //}

                        // quotes[i].party_id is Number, and is NULLABLE
                        var test4 = account == null ? true : quotes[i].party_id === +account;

                        // quotes[i].sales_channel_enum_id is varchar(20)
                        // Good column! I love it.
                        var test5 = salesChannel == null ? true : quotes[i].sales_channel_enum_id.toUpperCase() === salesChannel.toUpperCase();


                        if (test1 && test2 && test3 && test4 && test5) {
                            // build quote from returned columns
                            var quote = new Quote(
                                quotes[i].quote_id,
                                quotes[i].quote_type_id,
                                quotes[i].party_id,
                                quotes[i].issue_date,
                                quotes[i].status_id,
                                quotes[i].currency_uom_id,
                                quotes[i].sales_channel_enum_id,
                                quotes[i].valid_from_date,
                                quotes[i].valid_thru_date,
                                quotes[i].quote_name,
                                quotes[i].description,
                                quotes[i].contact_party_id,
                                quotes[i].created_by_party_id,
                                quotes[i].created_date,
                                quotes[i].updated_date
                            );
                            quoteEntities.push(quote);
                        } else {
                            continue;
                        }
                    }
                    return quoteEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            return null;
        }
    };


    // Author: Lucas
    /**
     * Gets quotes by advanced search
     * @param {String} query - query string: SOME ARGUMENT
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is an array of quote entities
     */
    var getQuotesByAdvanced = function (query, user) {
        //Check security permission of user
        var hasPermission = _.indexOf(user.securityPermissions, 'CRMSFA_QUOTE_CREATE');
        if (hasPermission !== -1) {

            // these variables are strings if were set, or object if null
            var quoteId = query.quoteId || null;
            var quoteName = query.quoteName || null;
            var status = query.status || null;
            var account = query.account || null;
            var salesChannel = query.salesChannel || null;

            var promise = quoteData.getQuotesByAdvanced(quoteId, quoteName, status, account, salesChannel)
                .then(function (quotes) {
                    var quoteEntities = [];
                    for (var i = 0; i < quotes.length; i++) {
                        var quote = new Quote(
                            quotes[i].quote_id,
                            quotes[i].quote_type_id,
                            quotes[i].party_id,
                            quotes[i].issue_date,
                            quotes[i].status_id,
                            quotes[i].currency_uom_id,
                            quotes[i].sales_channel_enum_id,
                            quotes[i].valid_from_date,
                            quotes[i].valid_thru_date,
                            quotes[i].quote_name,
                            quotes[i].description,
                            quotes[i].contact_party_id,
                            quotes[i].created_by_party_id,
                            quotes[i].created_date,
                            quotes[i].updated_date
                        );
                        quoteEntities.push(quote);
                    }
                    return quoteEntities;
                });
            promise.catch(function (error) {
                // Log the error
                winston.error(error);
            });
            return promise;
        } else {
            return null;
        }
    };

    return {
        addQuote: addQuote,
        addQuoteItem: addQuoteItem,
        addQuoteItemOption: addQuoteItemOption,
        updateQuote: updateQuote,
        updateQuoteItem: updateQuoteItem,
        updateQuoteItemOption: updateQuoteItemOption,
        getQuoteById: getQuoteById,
        getQuotesByOwner: getQuotesByOwner,
        getQuoteItems: getQuoteItems,
        getQuotesByAdvanced: getQuotesByAdvanced
    };
};

module.exports = quoteController;