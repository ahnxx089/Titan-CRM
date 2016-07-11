/////////////////////////////////////////////////
// Data access layer module for quotes.
//
// @file:    quoteData.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
//           William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */
/* jshint maxlen:1000 */
/* jshint shadow:true */
/* jshint maxcomplexity: false */

var quoteData = function (knex) {

    /**
     * Add a new quote
     * @param {Object} quote - The new quote to be added
     * @param {Object} user - The logged in user
     * @return {Object} promise - Fulfillment value is id of new contact
     */
    var addQuote = function (quote) {
        return knex('quote')
            .returning('quote_id')
            //passing through
            .insert({
                quote_type_id: quote.quoteTypeId,
                party_id: quote.partyId,
                issue_date: quote.issueDate,
                status_id: quote.statusId,
                currency_uom_id: quote.currencyUomId,
                sales_channel_enum_id: quote.salesChannelEnumId,
                valid_from_date: quote.validFromDate,
                valid_thru_date: quote.validThruDate,
                quote_name: quote.quoteName,
                description: quote.description,
                contact_party_id: quote.contactPartyId,
                created_by_party_id: quote.createdByPartyId,
                created_date: quote.createdDate,
                updated_date: quote.updatedDate
            })
            .then(function (quoteId) {
                return knex('quote_role')
                    .insert({
                        quote_id: quoteId,
                        party_id: quote.createdByPartyId,
                        role_type_id: 'PERSON_ROLE',
                        created_date: quote.createdDate,
                        updated_date: quote.updatedDate
                    })
                    .then(function () {
                        return quoteId;
                    });
            });
    };

    /**
     * Add a new item to a quote
     * @param {Object} quoteItem - quoteItem object to add to a quote
     * @return {Object} promise - Fulfillment value is number of rows added
     */
    var addQuoteItem = function (quoteItem) {
        /*  Note:  Per 2016 June 13 follow-up from the demo of the Quotes module, for this functionality
            (as well as updateQuote, updateQuoteItem, addQuoteItemOption, and updateQuoteItemOption below),
            the API should return the NUMBER of rows inserted.  Until now this function was just
            returning a copy of the quoteItem which was inserted-- doing so did not provide any real
            measure of what the quote_item table does/does not contain as a result of attempting the insert.

            Therefore after the insert is done by the first knex statement below, in the function inside
            .then() quoteItem.quoteId and quoteItem.quoteItemSeqId are used to query for the number of
            rows in table quote_item that have this combo of quote_id and quote_item_seq_id.
            Since those columns are both primary keys, there cannot be MORE THAN ONE row inserted with
            the same combo of quote_id and quote_item_seq_id.  The important thing here is to confirm that
            the count indeed DOES equal 1.  A count of 1 means the insert really happened.  If the count
            is 0, we know we have a problem.  That is why we want the API to return the number of rows
            inserted.

            In order for the API to get that info to report to the UI, here the .then() returns a promise.
            That promise's fulfillment value is an object whose zeroth element is a RowDataPacket.
            (See e.g., http://stackoverflow.com/questions/31221980/javascript-how-to-acess-rowdatapacket )
            That RowDataPacket is itself an object; its sole key is called 'count(*)' (that's what the
            knex.raw query winds up naming it).  The value of RowDataPacket['count(*)'] is the count of all
            the rows in the quote_item table with this combo of quoteItem.quoteId and
            quoteItem.quoteItemSeqId.  That count should be 1.  (The knex.raw query itself does not
            know/care what the count is, it will just return the object to the controller, which will apply
            some logic to determine what the count is, and then return that number up to the API for display.
            Then at the UI level we can determine whether or not we have a problem, depending on whether
            the count is 0 or 1.)
        */
        return knex('quote_item')
            .insert({
                quote_id: quoteItem.quoteId,
                quote_item_seq_id: quoteItem.quoteItemSeqId,
                product_id: quoteItem.productId,
                quantity: quoteItem.quantity,
                selected_amount: quoteItem.selectedAmount,
                quote_unit_price: quoteItem.quoteUnitPrice,
                estimated_delivery_date: quoteItem.estimatedDeliveryDate,
                comments: quoteItem.comments,
                is_promo: quoteItem.isPromo,
                description: quoteItem.description,
                created_date: quoteItem.createdDate,
                updated_date: quoteItem.updatedDate
            }).then(function () {
                return knex.raw('select count(*) from quote_item where quote_id = ' + quoteItem.quoteId + ' and quote_item_seq_id = ' + quoteItem.quoteItemSeqId);
            });
    };

    /**
     * Add a new option to an item of a quote
     * @param {Object} quoteItemOption - quoteItemOption object to add to an item of a quote
     * @return {Object} promise - Fulfillment value is number of rows added (see comments above
     *                              in addQuoteItem, exact same idea here)
     */
    var addQuoteItemOption = function (quoteItemOption) {
        return knex('quote_item_option')
            .insert({
                quote_id: quoteItemOption.quoteId,
                quote_item_seq_id: quoteItemOption.quoteItemSeqId,
                quote_item_option_seq_id: quoteItemOption.quoteItemOptionSeqId,
                quantity: quoteItemOption.quantity,
                quote_unit_price: quoteItemOption.quoteUnitPrice,
                created_date: quoteItemOption.createdDate,
                updated_date: quoteItemOption.updatedDate
            }).then(function () {
                return knex.raw('select count(*) from quote_item_option where quote_id = ' + quoteItemOption.quoteId + ' and quote_item_seq_id = ' + quoteItemOption.quoteItemSeqId + ' and quote_item_option_seq_id = ' + quoteItemOption.quoteItemOptionSeqId);
            });
    };

    /**
     * Update a quote in database
     * @param {Object} quote - Quote entity with update info for existing quote
     * @return {Object} promise - Fulfillment value is number of rows updated (see comments above
     *                              in addQuoteItem, exact same idea here)
     */
    var updateQuote = function (quote) {
        return knex('quote')
            .where({
                quote_id: quote.quoteId
            })
            .update({
                quote_type_id: quote.quoteTypeId,
                party_id: quote.partyId,
                issue_date: quote.issueDate,
                status_id: quote.statusId,
                currency_uom_id: quote.currencyUomId,
                sales_channel_enum_id: quote.salesChannelEnumId,
                valid_from_date: quote.validFromDate,
                valid_thru_date: quote.validThruDate,
                quote_name: quote.quoteName,
                description: quote.description,
                contact_party_id: quote.contactPartyId,
                updated_date: quote.updatedDate
            })
            .then(function () {
                return knex.raw('select count(*) from quote where quote_id = ' + quote.quoteId);
            });
    };

    /**
     * Update a quote item in database
     * @param {Object} quoteItem - QuoteItem entity with update info for existing item of a quote
     * @return {Object} promise - Fulfillment value is number of rows updated (see comments above
     *                              in addQuoteItem, exact same idea here)
     */
    var updateQuoteItem = function (quoteItem) {
        return knex('quote_item')
            .where({
                quote_id: quoteItem.quoteId
            })
            .andWhere({
                quote_item_seq_id: quoteItem.quoteItemSeqId
            })
            .update({
                product_id: quoteItem.productId,
                quantity: quoteItem.quantity,
                selected_amount: quoteItem.selectedAmount,
                quote_unit_price: quoteItem.quoteUnitPrice,
                estimated_delivery_date: quoteItem.estimatedDeliveryDate,
                comments: quoteItem.comments,
                is_promo: quoteItem.isPromo,
                description: quoteItem.description,
                updated_date: quoteItem.updatedDate
            }).then(function () {
                return knex.raw('select count(*) from quote_item where quote_id = ' + quoteItem.quoteId + ' and quote_item_seq_id = ' + quoteItem.quoteItemSeqId);
            });
    };

    /**
     * Update a quote item option in database
     * @param {Object} quoteItemOption - QuoteItemOption entity with update for option of item of quote
     * @return {Object} promise - Fulfillment value is number of rows updated (see comments above
     *                              in addQuoteItem, exact same idea here)
     */
    var updateQuoteItemOption = function (quoteItemOption) {
        return knex('quote_item_option')
            .where({
                quote_id: quoteItemOption.quoteId
            })
            .andWhere({
                quote_item_seq_id: quoteItemOption.quoteItemSeqId
            })
            .andWhere({
                quote_item_option_seq_id: quoteItemOption.quoteItemOptionSeqId
            })
            .update({
                quantity: quoteItemOption.quantity,
                quote_unit_price: quoteItemOption.quoteUnitPrice,
                updated_date: quoteItemOption.updatedDate
            }).then(function () {
                return knex.raw('select count(*) from quote_item_option where quote_id = ' + quoteItemOption.quoteId + ' and quote_item_seq_id = ' + quoteItemOption.quoteItemSeqId + ' and quote_item_option_seq_id = ' + quoteItemOption.quoteItemOptionSeqId);
            });
    };

    /**
     * Gets one quote by its id
     * @param {Number} quoteId - Unique id of the quote to be fetched
     * @return {Object} promise - Fulfillment value is a quote entity
     */
    var getQuoteById = function (quoteId) {
        return knex.select(
                'quote_id',
                'quote_type_id',
                'party_id',
                'issue_date',
                'status_id',
                'currency_uom_id',
                'sales_channel_enum_id',
                'valid_from_date',
                'valid_thru_date',
                'quote_name',
                'description',
                'contact_party_id',
                'created_by_party_id',
                'created_date',
                'updated_date')
            .from('quote')
            .where({
                'quote_id': quoteId
            });
    };

    /**
     * Gets all Items of a Quote by the quoteId
     * @param {Number} quoteId - Unique id of the quote whose Items (if any) are to be fetched
     * @return {Object} promise - Fulfillment value is an array of quoteItem Entities
     */
    var getQuoteItems = function (quoteIdForItems) {
        return knex.select( 'quote_id', 'quote_item_seq_id', 'product_id', 'quantity', 'selected_amount', 'quote_unit_price', 'estimated_delivery_date', 'comments', 'is_promo', 'description', 'created_date', 'updated_date')
            .from('quote_item')
            .where('quote_id', quoteIdForItems)
    };

    /**
     * Gets quotes owned by the user/owner
     * @return {Object} promise - Fulfillment value is an array of quote entities
     */
    var getQuotesByOwner = function (userPartyId) {
        //Note by Eric - until I'm told otherwise, I will assume here that the "owner"
        //corresponds to the party id listed in the quote table's created_by_party_id field
        //(and not the party_id or contact_party_id fields).
        return knex.select('quote.quote_id', 'quote.quote_type_id', 'quote.party_id', 'quote.issue_date', 'quote.status_id',
                'quote.currency_uom_id', 'quote.sales_channel_enum_id', 'quote.valid_from_date',
                'quote.valid_thru_date', 'quote.quote_name', 'quote.description', 'quote.contact_party_id',
                'quote.created_by_party_id', 'quote.created_date', 'quote.updated_date')
            .from('quote')
            .innerJoin('quote_role', 'quote.quote_id', 'quote_role.quote_id')
            .where('quote.created_by_party_id', userPartyId)
            .andWhere('quote_role.party_id', userPartyId)
            .andWhere('quote_role.role_type_id', 'PERSON_ROLE');
    };

    // NOTE: getQuotesByAdvanced[Alt] did not have links to quote_role table.

    // Author: Lucas
    // In case of large number of quotes, fetching them all is not efficient.
    // Consider: build raw query (for MySQL) in data layer. See Dukjin's caseData.getCasesByAdvanced for reference.
    // This function is not used, and deactivated.
    /**
     * Gets all quotes from database by advanced search
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getQuotesByAdvancedAlt = function (quoteId, quoteName, status, account, salesChannel) {

        //        return knex.raw('select * from quote where ' + ' sales_channel_enum_id = "' + salesChannel + '"');
        return knex.from('quote');
    };

    // Author: Lucas
    // Thanks: Dinesh
    // This is a better approach to fetch matching records, better than the alternative version and raw sql version.
    /**
     * Gets all quotes from database by advanced search
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getQuotesByAdvanced = function (quoteId, quoteName, status, account, salesChannel) {
        var searchByQuoteId = !!quoteId;
        var searchByQuoteName = !!quoteName;
        var searchByStatus = !!status;
        var searchByAccount = !!account;
        var searchBySalesChannel = !!salesChannel;

        var query = knex.select().from('quote');

        if (searchByQuoteId || searchByQuoteName || searchByStatus || searchByAccount || searchBySalesChannel) {

            // not-nullable number
            if (searchByQuoteId){
                query = query.andWhere('quote_id', quoteId);
            }
            // nullable varchar
            if (searchByQuoteName){
                query = query.andWhere('quote_name', 'like', '%'+quoteName+'%');
            }
            // nullable varchar
            if (searchByStatus){
                query = query.andWhere('status_id', 'like', '%'+status+'%');
            }
            // nullable number
            if (searchByAccount){
                query = query.andWhere('party_id', account);
            }
            // not-nullable varchar
            if (searchBySalesChannel){
                query = query.andWhere('sales_channel_enum_id', salesChannel);
            }
            console.log(query.toString());
        }
        return query;
    };



    return {
        addQuote: addQuote,
        addQuoteItem: addQuoteItem,
        addQuoteItemOption: addQuoteItemOption,
        updateQuoteItem: updateQuoteItem,
        updateQuoteItemOption: updateQuoteItemOption,
        getQuoteById: getQuoteById,
        getQuotesByOwner: getQuotesByOwner,
        getQuoteItems: getQuoteItems,
        getQuotesByAdvanced: getQuotesByAdvanced,
        updateQuote: updateQuote
    };
};

module.exports = quoteData;