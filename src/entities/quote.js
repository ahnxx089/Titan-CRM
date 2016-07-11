/////////////////////////////////////////////////
// Quote entity.
// Properties and validation methods.
//
// @file:   quote.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();

// Constructor 
//
function Quote(quoteId, quoteTypeId, partyId, issueDate, statusId, currencyUomId, salesChannelEnumId, validFromDate, validThruDate, quoteName, description, contactPartyId, createdByPartyId, createdDate, updatedDate) {

    // Properties
    this.quoteId = quoteId;
    this.quoteTypeId = quoteTypeId;
    this.partyId = partyId;
    this.issueDate = issueDate;
    this.statusId = statusId;
    this.currencyUomId = currencyUomId;
    this.salesChannelEnumId = salesChannelEnumId;
    this.validFromDate = validFromDate;
    this.validThruDate = validThruDate;
    this.quoteName = quoteName;
    this.description = description;
    this.contactPartyId = contactPartyId;
    this.createdByPartyId = createdByPartyId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}

// Methods
//
Quote.prototype.validateForInsert = function () {
    // Perform validations
    var validations = [
        this.validateQuoteTypeId(true),
        this.validatePartyId(false),
        this.validateIssueDate(true),
        this.validateStatusId(false),
        this.validateCurrencyUomId(false),
        this.validateSalesChannelEnumId(true),
        this.validateValidFromDate(false),
        this.validateValidThruDate(false),
        this.validateQuoteName(false),
        this.validateDescription(false),
        this.validateContactPartyId(false),
        this.validateCreatedByPartyId(true),
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

Quote.prototype.validateForUpdate = function () {
    // Perform validations
    var validations = [
        this.validateQuoteId(true),
        this.validateQuoteTypeId(true),
        this.validatePartyId(false),
        this.validateIssueDate(true),
        this.validateStatusId(false),
        this.validateCurrencyUomId(false),
        this.validateSalesChannelEnumId(true),
        this.validateValidFromDate(false),
        this.validateValidThruDate(false),
        this.validateQuoteName(false),
        this.validateDescription(false),
        this.validateContactPartyId(false),
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

Quote.prototype.validateQuoteId = function(isRequired) {
    this.quoteId = validation.sanitizeInput(this.quoteId);
    var validationResult = validation.validateInt(this.quoteId, isRequired, 'quoteId');
    if(this.quoteId && !validationResult) {
        this.quoteId = validation.convertToInt(this.quoteId);
    }
    return validationResult;
};

Quote.prototype.validateQuoteTypeId = function(isRequired) {
    this.quoteTypeId = validation.sanitizeInput(this.quoteTypeId);
    var validationResult = validation.validateString(this.quoteTypeId, isRequired, 20, 'quoteTypeId');
    return validationResult;
};

Quote.prototype.validatePartyId = function(isRequired) {
    this.partyId = validation.sanitizeInput(this.partyId);
    var validationResult = validation.validateInt(this.partyId, isRequired, 'partyId');
    if(this.partyId && !validationResult) {
        this.partyId = validation.convertToInt(this.partyId);
    }
    return validationResult;
};

Quote.prototype.validateIssueDate = function(isRequired) {
    this.issueDate = validation.sanitizeInput(this.issueDate);
    var validationResult = validation.validateDate(this.issueDate, isRequired, 'issueDate');
    return validationResult;
};

Quote.prototype.validateStatusId = function(isRequired) {
    this.statusId = validation.sanitizeInput(this.statusId);
    var validationResult = validation.validateString(this.statusId, isRequired, 20, 'statusId');
    return validationResult;
};

Quote.prototype.validateCurrencyUomId = function(isRequired) {
    this.currencyUomId = validation.sanitizeInput(this.currencyUomId);
    var validationResult = validation.validateString(this.currencyUomId, isRequired, 20, 'currencyUomId');
    return validationResult;
};

Quote.prototype.validateSalesChannelEnumId = function(isRequired) {
    this.salesChannelEnumId = validation.sanitizeInput(this.salesChannelEnumId);
    var validationResult = validation.validateString(this.salesChannelEnumId, isRequired, 20, 'salesChannelEnumId');
    return validationResult;
};

Quote.prototype.validateValidFromDate = function(isRequired) {
    this.validFromDate = validation.sanitizeInput(this.validFromDate);
    var validationResult = validation.validateDate(this.validFromDate, isRequired, 'validFromDate');
    return validationResult;
};

Quote.prototype.validateValidThruDate = function(isRequired) {
    this.validThruDate = validation.sanitizeInput(this.validThruDate);
    var validationResult = validation.validateDate(this.validThruDate, isRequired, 'validThruDate');
    return validationResult;
};

Quote.prototype.validateQuoteName = function (isRequired) {
    this.quoteName = validation.sanitizeInput(this.quoteName);
    var validationResult = validation.validateString(this.quoteName, isRequired, 100, 'quoteName');
    return validationResult;
};

Quote.prototype.validateDescription = function (isRequired) {
    this.description = validation.sanitizeInput(this.description);
    var validationResult = validation.validateString(this.description, isRequired, 255, 'description');
    return validationResult;
};

Quote.prototype.validateContactPartyId = function(isRequired) {
    this.contactPartyId = validation.sanitizeInput(this.contactPartyId);
    var validationResult = validation.validateInt(this.contactPartyId, isRequired, 'contactPartyId');
    if(this.contactPartyId && !validationResult) {
        this.contactPartyId = validation.convertToInt(this.contactPartyId);
    }
    return validationResult;
};

Quote.prototype.validateCreatedByPartyId = function(isRequired) {
    this.createdByPartyId = validation.sanitizeInput(this.createdByPartyId);
    var validationResult = validation.validateInt(this.createdByPartyId, isRequired, 'createdByPartyId');
    if(this.createdByPartyId && !validationResult) {
        this.createdByPartyId = validation.convertToInt(this.createdByPartyId);
    }
    return validationResult;
};

Quote.prototype.validateCreatedDate = function(isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

Quote.prototype.validateUpdatedDate = function(isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};

// Export the class as a module
module.exports = Quote;