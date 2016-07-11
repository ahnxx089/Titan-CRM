/////////////////////////////////////////////////
// Case entity.
// Properties and validation methods.
//
// @file:   case.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();

// Constructor
//
function Case(caseId, caseTypeId, caseCategoryId, statusId, fromPartyId, priority,
    caseDate, responseRequiredDate, caseName, description, resolutionId,
    createdBy, createdDate, updatedDate) {

    // Properties
    this.caseId = caseId;
    this.caseTypeId = caseTypeId;
    this.caseCategoryId = caseCategoryId;
    this.statusId = statusId;
    this.fromPartyId = fromPartyId;
    this.priority = priority;
    this.caseDate = caseDate;
    this.responseRequiredDate = responseRequiredDate;
    this.caseName = caseName;
    this.description = description;
    this.resolutionId = resolutionId;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
}

// Methods
//
Case.prototype.validateForInsert = function () {
    // Perform validations
    var validations = [
//        this.validateCaseId(true),
        this.validateCaseTypeId(true),
        this.validateCaseCategoryId(true),
        this.validateStatusId(true),
        this.validateFromPartyId(false),
        this.validatePriority(false),
        this.validateCaseDate(false),
        this.validateResponseRequiredDate(false),
        this.validateCaseName(true),
        this.validateDescription(false),
        this.validateResolutionId(false),
        this.validateCreatedBy(true),
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

Case.prototype.validateForUpdate = function () {
    // Perform validations
    var validations = [
        this.validateCaseId(true),
        this.validateCaseTypeId(true),
        this.validateCaseCategoryId(true),
        this.validateStatusId(true),
        this.validateFromPartyId(false),
        this.validatePriority(false),
        this.validateCaseDate(false),
        this.validateResponseRequiredDate(false),
        this.validateCaseName(true),
        this.validateDescription(false),
        this.validateResolutionId(false),
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

Case.prototype.validateCaseId = function (isRequired) {
    this.caseId = validation.sanitizeInput(this.caseId);
    var validationResult = validation.validateInt(this.caseId, isRequired, 'caseId');
    if (this.caseId && !validationResult) {
        this.caseId = validation.convertToInt(this.caseId);
    }
    return validationResult;
};

Case.prototype.validateCaseTypeId = function (isRequired) {
    this.caseTypeId = validation.sanitizeInput(this.caseTypeId);
    var validationResult = validation.validateString(this.caseTypeId, isRequired, 20, 'caseTypeId');
    return validationResult;
};

Case.prototype.validateCaseCategoryId = function (isRequired) {
    this.caseCategoryId = validation.sanitizeInput(this.caseCategoryId);
    var validationResult = validation.validateString(this.caseCategoryId, isRequired, 20, 'caseCategoryId');
    return validationResult;
};

Case.prototype.validateStatusId = function (isRequired) {
    this.statusId = validation.sanitizeInput(this.statusId);
    var validationResult = validation.validateString(this.statusId, isRequired, 20, 'statusId');
    return validationResult;
};

Case.prototype.validateFromPartyId = function (isRequired) {
    this.fromPartyId = validation.sanitizeInput(this.fromPartyId);
    var validationResult = validation.validateInt(this.fromPartyId, isRequired, 'fromPartyId');
    return validationResult;
};

Case.prototype.validatePriority = function (isRequired) {
    this.priority = validation.sanitizeInput(this.priority);
    var validationResult = validation.validateInt(this.priority, isRequired, 'priority');
    return validationResult;
};

Case.prototype.validateCaseDate = function (isRequired) {
    this.caseDate = validation.sanitizeInput(this.caseDate);
    var validationResult = validation.validateDate(this.caseDate, isRequired, 'caseDate');
    return validationResult;
};

Case.prototype.validateResponseRequiredDate = function (isRequired) {
    this.responseRequiredDate = validation.sanitizeInput(this.responseRequiredDate);
    var validationResult = validation.validateDate(this.responseRequiredDate, isRequired, 'responseRequiredDate');
    return validationResult;
};

Case.prototype.validateCaseName = function (isRequired) {
    this.caseName = validation.sanitizeInput(this.caseName);
    var validationResult = validation.validateString(this.caseName, isRequired, 100, 'caseName');
    return validationResult;
};

Case.prototype.validateDescription = function (isRequired) {
    this.description = validation.sanitizeInput(this.description);
    var validationResult = validation.validateString(this.description, isRequired, 255, 'description');
    return validationResult;
};

Case.prototype.validateResolutionId = function (isRequired) {
    this.resolutionId = validation.sanitizeInput(this.resolutionId);
    var validationResult = validation.validateString(this.resolutionId, isRequired, 20, 'resolutionId');
    return validationResult;
};

Case.prototype.validateCreatedBy = function (isRequired) {
    this.createdBy = validation.sanitizeInput(this.createdBy);
    var validationResult = validation.validateString(this.createdBy, isRequired, 100, 'createdBy');
    return validationResult;
};

Case.prototype.validateCreatedDate = function (isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

Case.prototype.validateUpdatedDate = function (isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};

// Export the class as a module
module.exports = Case;
