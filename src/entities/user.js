/////////////////////////////////////////////////
// User entity.
// Properties and validation methods.
//
// @file:   user.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var validation = require('../common/validation')();

// Constructor
//
function User(userId, password, passwordHint, enabled, disabledDate,
               partyId, createdDate, updatedDate, securityPermissions) {
    // Properties
    this.userId = userId;
    this.password = password;
    this.passwordHint = passwordHint;
    this.enabled = enabled;
    this.disabledDate = disabledDate;
    this.partyId = partyId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.securityPermissions = securityPermissions;
}


// Methods
//
User.prototype.validateForInsert = function() {
    // Perform validations
    var validations = [
        this.validateUserId(true),
        this.validatePassword(true),
        this.validatePasswordHint(false),
        this.validateEnabled(true),
        this.validateDisabledDate(false),
        this.validatePartyId(true),
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

User.prototype.validateForUpdate = function() {
    // Perform validations
    var validations = [
        this.validateUserId(true),
        this.validatePassword(true),
        this.validatePasswordHint(false),
        this.validateEnabled(true),
        this.validateDisabledDate(false),
        this.validatePartyId(true),
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

User.prototype.validateUserId = function(isRequired) {
    this.userId = validation.sanitizeInput(this.userId);
    var validationResult = validation.validateString(this.userId, isRequired, 100, 'userId');
    return validationResult;
};

User.prototype.validatePassword = function(isRequired) {
    this.password = validation.sanitizeInput(this.password);
    var validationResult = validation.validateString(this.password, isRequired, 100, 'password');
    return validationResult;
};

User.prototype.validatePasswordHint = function(isRequired) {
    this.passwordHint = validation.sanitizeInput(this.passwordHint);
    var validationResult = validation.validateString(this.passwordHint, isRequired, 255, 'passwordHint');
    return validationResult;
};

User.prototype.validateEnabled = function(isRequired) {
    this.enabled = validation.sanitizeInput(this.enabled);
    var validationResult = validation.validateBoolean(this.enabled, isRequired, 'enabled');
    if(this.enabled && !validationResult) {
        this.enabled = validation.convertToInt(this.enabled);
    }
    return validationResult;
};

User.prototype.validateDisabledDate = function(isRequired) {
    this.disabledDate = validation.sanitizeInput(this.disabledDate);
    var validationResult = validation.validateDate(this.disabledDate, isRequired, 'disabledDate');
    return validationResult;
};

User.prototype.validatePartyId = function(isRequired) {
    this.partyId = validation.sanitizeInput(this.partyId);
    var validationResult = validation.validateInt(this.partyId, isRequired, 'partyId');
    if(this.partyId && !validationResult) {
        this.partyId = validation.convertToInt(this.partyId);
    }
    return validationResult;
};

User.prototype.validateCreatedDate = function(isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

User.prototype.validateUpdatedDate = function(isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};


// Export the class as a module
module.exports = User;