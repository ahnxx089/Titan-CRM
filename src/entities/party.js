/////////////////////////////////////////////////
// Party entity.
// Properties and validation methods.
//
// @file:   party.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var validation = require('../common/validation')();

// Constructor
//
function Party(partyId, partyTypeId, currencyUomId, description,
                statusId, createdBy, createdDate, updatedDate) {
    // Properties
    this.partyId = partyId;
    this.partyTypeId = partyTypeId;
    this.preferredCurrencyUomId = currencyUomId;
    this.description = description;
    this.statusId = statusId;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}


// Methods
//
Party.prototype.validateForInsert = function() {
    // Perform validations
    var validations = [
        this.validatePartyTypeId(true),
        this.validatePreferredCurrencyUomId(false),
        this.validateDescription(false),
        this.validateStatusId(true),
        this.validateCreatedBy(true),//per DB design, this is nullable
        this.validateCreatedDate(true),
        this.validateUpdatedDate(true)
    ];
    // The "errors" array is "validations" array
    // with empty string elements weeded out
    // If all validations succeed,
    // "errors" will have 0 elements.
    var errors = [];
    for(var i=0; i < validations.length; i++) {
        if(validations[i]) {
            errors.push(validations[i]);
        }
    }
    return errors;
};

Party.prototype.validateForUpdate = function() {
    // Perform validations
    var validations = [
        this.validatePartyId(true),
        this.validatePartyTypeId(true),
        this.validatePreferredCurrencyUomId(false),
        this.validateDescription(false),
        this.validateStatusId(true),
        this.validateUpdatedDate(true)
    ];
    // The "errors" array is "validations" array
    // with empty string elements weeded out
    // If all validations succeed,
    // "errors" will have 0 elements.
    var errors = [];
    for(var i=0; i < validations.length; i++) {
        if(validations[i]) {
            errors.push(validations[i]);
        }
    }
    return errors;
};

Party.prototype.validatePartyId = function(isRequired) {
    this.partyId = validation.sanitizeInput(this.partyId);
    var validationResult = validation.validateInt(this.partyId, isRequired, 'partyId');
    if(this.partyId && !validationResult) {
        this.partyId = validation.convertToInt(this.partyId);
    }
    return validationResult;
};

Party.prototype.validatePartyTypeId = function(isRequired) {
    this.partyTypeId = validation.sanitizeInput(this.partyTypeId);
    var validationResult = validation.validateString(this.partyTypeId, isRequired, 20, 'partyTypeId');
    return validationResult;
};

Party.prototype.validatePreferredCurrencyUomId = function(isRequired) {
    this.preferredCurrencyUomId = validation.sanitizeInput(this.preferredCurrencyUomId);
    var validationResult = validation.validateString(this.preferredCurrencyUomId, isRequired, 20, 'preferredCurrencyUomId');
    return validationResult;
};

Party.prototype.validateDescription = function(isRequired) {
    this.description = validation.sanitizeInput(this.description);
    var validationResult = validation.validateString(this.description, isRequired, 65535, 'description');
    return validationResult;
};

Party.prototype.validateStatusId = function(isRequired) {
    this.statusId = validation.sanitizeInput(this.statusId);
    var validationResult = validation.validateString(this.statusId, isRequired, 20, 'statusId');
    return validationResult;
};

Party.prototype.validateCreatedBy = function(isRequired) {
    this.createdBy = validation.sanitizeInput(this.createdBy);
    var validationResult = validation.validateString(this.createdBy, isRequired, 100, 'createdBy');
    return validationResult;
};

Party.prototype.validateCreatedDate = function(isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

Party.prototype.validateUpdatedDate = function(isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};


// Export the class as a module
module.exports = Party;