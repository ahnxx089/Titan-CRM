/////////////////////////////////////////////////
// QuoteItem entity.
// Properties and validation methods.
//
// @file:   quoteItem.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();

// Constructor 
//
function QuoteItem(quoteId, quoteItemSeqId, productId, quantity, selectedAmount, quoteUnitPrice, estimatedDeliveryDate, comments, isPromo, description, createdDate, updatedDate) {

    // Properties
    this.quoteId = quoteId;
    this.quoteItemSeqId = quoteItemSeqId;
    this.productId = productId;
    this.quantity = quantity;
    this.selectedAmount = selectedAmount;
    this.quoteUnitPrice = quoteUnitPrice;
    this.estimatedDeliveryDate = estimatedDeliveryDate;
    this.comments = comments;
    this.isPromo = isPromo;
    this.description = description;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}

// Methods
//
QuoteItem.prototype.validateForInsert = function () {
    // Perform validations
    var validations = [
        this.validateQuoteId(true),
        this.validateQuoteItemSeqId(true),
        this.validateProductId(false),
        this.validateQuantity(false),
        this.validateSelectedAmount(false),
        this.validateQuoteUnitPrice(false),
        this.validateEstimatedDeliveryDate(false),
        this.validateComments(false),
        this.validateIsPromo(false),
        this.validateDescription(false),
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

QuoteItem.prototype.validateForUpdate = function () {
    // Perform validations
    var validations = [
        this.validateQuoteId(true),
        this.validateQuoteItemSeqId(true),
        this.validateProductId(false),
        this.validateQuantity(false),
        this.validateSelectedAmount(false),
        this.validateQuoteUnitPrice(false),
        this.validateEstimatedDeliveryDate(false),
        this.validateComments(false),
        this.validateIsPromo(false),
        this.validateDescription(false),
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

QuoteItem.prototype.validateQuoteId = function (isRequired) {
    this.quoteId = validation.sanitizeInput(this.quoteId);
    var validationResult = validation.validateInt(this.quoteId, isRequired, 'quoteId');
    if (this.quoteId && !validationResult) {
        this.quoteId = validation.convertToInt(this.quoteId);
    }
    return validationResult;
};

QuoteItem.prototype.validateQuoteItemSeqId = function (isRequired) {
    this.quoteItemSeqId = validation.sanitizeInput(this.quoteItemSeqId);
    var validationResult = validation.validateString(this.quoteItemSeqId, isRequired, 20, 'quoteItemSeqId');
    return validationResult;
};

QuoteItem.prototype.validateProductId = function (isRequired) {
    this.productId = validation.sanitizeInput(this.productId);
    var validationResult = validation.validateString(this.productId, isRequired, 20, 'productId');
    return validationResult;
};

QuoteItem.prototype.validateQuantity = function (isRequired) {
    this.quantity = validation.sanitizeInput(this.quantity);
    var validationResult = validation.validateFloat(this.quantity, isRequired, 'quantity');
    if (this.quantity && !validationResult) {
        this.quantity = validation.convertToFloat(this.quantity);
    }
    return validationResult;
};

QuoteItem.prototype.validateSelectedAmount = function (isRequired) {
    this.selectedAmount = validation.sanitizeInput(this.selectedAmount);
    var validationResult = validation.validateFloat(this.selectedAmount, isRequired, 'selectedAmount');
    if (this.selectedAmount && !validationResult) {
        this.selectedAmount = validation.convertToFloat(this.selectedAmount);
    }
    return validationResult;
};

QuoteItem.prototype.validateQuoteUnitPrice = function (isRequired) {
    this.quoteUnitPrice = validation.sanitizeInput(this.quoteUnitPrice);
    var validationResult = validation.validateFloat(this.quoteUnitPrice, isRequired, 'quoteUnitPrice');
    if (this.quoteUnitPrice && !validationResult) {
        this.quoteUnitPrice = validation.convertToFloat(this.quoteUnitPrice);
    }
    return validationResult;
};

QuoteItem.prototype.validateEstimatedDeliveryDate = function (isRequired) {
    this.estimatedDeliveryDate = validation.sanitizeInput(this.estimatedDeliveryDate);
    var validationResult = validation.validateDate(this.estimatedDeliveryDate, isRequired, 'estimatedDeliveryDate');
    return validationResult;
};

QuoteItem.prototype.validateComments = function (isRequired) {
    this.comments = validation.sanitizeInput(this.comments);
    var validationResult = validation.validateString(this.comments, isRequired, 255, 'comments');
    return validationResult;
};

QuoteItem.prototype.validateIsPromo = function (isRequired) {
    this.isPromo = validation.sanitizeInput(this.isPromo);
    var validationResult = validation.validateInt(this.isPromo, isRequired, 'isPromo');
    if (this.isPromo && !validationResult) {
        this.isPromo = validation.convertToInt(this.isPromo);
    }
    return validationResult;
};

QuoteItem.prototype.validateDescription = function (isRequired) {
    this.description = validation.sanitizeInput(this.description);
    var validationResult = validation.validateString(this.description, isRequired, 255, 'description');
    return validationResult;
};

QuoteItem.prototype.validateCreatedDate = function (isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

QuoteItem.prototype.validateUpdatedDate = function (isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};

// Export the class as a module
module.exports = QuoteItem;
