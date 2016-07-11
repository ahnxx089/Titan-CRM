/////////////////////////////////////////////////
// All actions for Quotes module pages.
//
// @file:   QuotesActions.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var TitanDispatcher = require('../dispatcher/TitanDispatcher');
var QuotesConstants = require('../constants/QuotesConstants');

var QuotesActions = {

    getQuotesByOwner: function() {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.GET_MY_QUOTES
        });
    },
    addQuote: function(quote) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.ADD_QUOTE,
            data: quote
        });
    },
    addQuoteItem: function(quoteItem) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.ADD_QUOTE_ITEM,
            data: quoteItem
        });
    },
    addQuoteItemOption: function(quoteItemOption) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.ADD_QUOTE_ITEM_OPTION,
            data: quoteItemOption
        });
    },
    getQuoteById: function(quoteId) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.GET_QUOTE_BY_ID,
            data: quoteId
        });
    },
    updateQuote: function(quote) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.UPDATE_QUOTE,
            data: {
                quote: quote
            }
        });
    },
    updateQuoteItem: function(quoteItem) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.UPDATE_QUOTE_ITEM,
            data: {
                quoteItem: quoteItem
            }
        });
    },
    getQuoteItems: function(quoteId) {
        TitanDispatcher.dispatch({
            actionType: QuotesConstants.GET_QUOTE_ITEMS,
            data: quoteId
        });
    },
};

module.exports = QuotesActions;