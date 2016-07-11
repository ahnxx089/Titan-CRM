/////////////////////////////////////////////////
// QuoteItemOption entity.
// Properties and validation methods.
//
// @file:   quoteItemOptoin.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();

// Constructor 
//
function QuoteItemOption(quoteId, quoteItemSeqId, quoteItemOptionSeqId, quantity, quoteUnitPrice, createdDate, updatedDate) {

    // Properties
    this.quoteId = quoteId;
    this.quoteItemSeqId = quoteItemSeqId;
    this.quoteItemOptionSeqId = quoteItemOptionSeqId;
    this.quantity = quantity;
    this.quoteUnitPrice = quoteUnitPrice;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}

QuoteItemOption.prototype.validateForInsert = function () {
    // Perform validations
    var validations = [
        this.validateQuoteId(true),
        this.validateQuoteItemSeqId(true),
        this.validateQuoteItemOptionSeqId(true),
        this.validateQuantity(true),
        this.validateQuoteUnitPrice(true),
        this.validateCreatedDate(true),
        this.validateUpdatedDate(true)
    ];
    // The "errors" array is "validations" array
    // with empty string elements weeded out
    // If all validations succeed,
    // "errors" will have 0 elements.
    var errors = [];
    for (var i = 0; i < validations.length; i++) {
        if (validations[i]) {
            errors.push(validations[i]);
        }
    }
    return errors;
};

QuoteItemOption.prototype.validateForUpdate = function () {
    // Perform validations
    var validations = [
        this.validateQuoteId(true),
        this.validateQuoteItemSeqId(true),
        this.validateQuoteItemOptionSeqId(true),
        this.validateQuantity(true),
        this.validateQuoteUnitPrice(true),
        this.validateUpdatedDate(true)
    ];
    // The "errors" array is "validations" array
    // with empty string elements weeded out
    // If all validations succeed,
    // "errors" will have 0 elements.
    var errors = [];
    for (var i = 0; i < validations.length; i++) {
        if (validations[i]) {
            errors.push(validations[i]);
        }
    }
    return errors;
};

QuoteItemOption.prototype.validateQuoteId = function (isRequired) {
    this.quoteId = validation.sanitizeInput(this.quoteId);
    var validationResult = validation.validateInt(this.quoteId, isRequired, 'quoteId');
    if (this.quoteId && !validationResult) {
        this.quoteId = validation.convertToInt(this.quoteId);
    }
    return validationResult;
};

QuoteItemOption.prototype.validateQuoteItemSeqId = function (isRequired) {
    this.quoteItemSeqId = validation.sanitizeInput(this.quoteItemSeqId);
    var validationResult = validation.validateString(this.quoteItemSeqId, isRequired, 20, 'quoteItemSeqId');
    return validationResult;
};

QuoteItemOption.prototype.validateQuoteItemOptionSeqId = function (isRequired) {
    this.quoteItemOptionSeqId = validation.sanitizeInput(this.quoteItemOptionSeqId);
    var validationResult = validation.validateString(this.quoteItemOptionSeqId, isRequired, 20, 'quoteItemOptionSeqId');
    return validationResult;
};

QuoteItemOption.prototype.validateQuantity = function (isRequired) {
    this.quantity = validation.sanitizeInput(this.quantity);
    var validationResult = validation.validateFloat(this.quantity, isRequired, 'quantity');
    if (this.quantity && !validationResult) {
        this.quantity = validation.convertToFloat(this.quantity);
    }
    return validationResult;
};

QuoteItemOption.prototype.validateQuoteUnitPrice = function (isRequired) {
    this.quoteUnitPrice = validation.sanitizeInput(this.quoteUnitPrice);
    var validationResult = validation.validateFloat(this.quoteUnitPrice, isRequired, 'quoteUnitPrice');
    if (this.quoteUnitPrice && !validationResult) {
        this.quoteUnitPrice = validation.convertToFloat(this.quoteUnitPrice);
    }
    return validationResult;
};

QuoteItemOption.prototype.validateCreatedDate = function (isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

QuoteItemOption.prototype.validateUpdatedDate = function (isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};

// Export the class as a module
module.exports = QuoteItemOption;



