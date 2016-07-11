/////////////////////////////////////////////////
// Person entity.
// Inherits from Party.
// Properties and validation methods.
//
// @file:   person.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint maxparams:20 */

var validation = require('../common/validation')();
var Party = require('../entities/party');

// Constructor
//
function Person(partyId, partyTypeId, currencyUomId, description,
    statusId, createdBy, createdDate, updatedDate,
    salutation, firstName, middleName, lastName, birthDate, comments) {
    // Call the parent constructor (Party), making sure
    // that "this" is set correctly during the call
    Party.call(this, partyId, partyTypeId, currencyUomId, description,
    statusId, createdBy, createdDate, updatedDate);

    // Person-specific Properties
    this.salutation = salutation;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.comments = comments;
}

// Inherit from Party
//
Person.prototype = Object.create(Party.prototype);
// Set the "constructor" property to refer to Person
Person.prototype.constructor = Person;


// Methods
//
Person.prototype.validateForInsert = function () {
    // Call Party's validation function
    var errors = Party.prototype.validateForInsert.call(this);
    
    // the line above validates
//    PartyTypeId(required),
//    PreferredCurrencyUomId(nullable),
//    Description(nullable),
//    StatusId(required),
//    CreatedBy(required), // although per DB design, this should be nullable and can be null
//    CreatedDate(required),
//    UpdatedDate(required)
    
    // Person-specific validation code
    var specificValidations = [
        // true means required, false means nullable
        // First name, last name are required
        // Others are not
        this.validateSalutation(false),
        this.validateFirstName(true),
        this.validateMiddleName(false),
        this.validateLastName(true),
        this.validateBirthDate(false),
        this.validateComments(false)
    ]; 
    
    for(var i=0; i < specificValidations.length; i++) {
        if(specificValidations[i]) {
            errors.push(specificValidations[i]);
        }
    }
    return errors;
};

Person.prototype.validateForUpdate = function () {
    // Call Party's validation function
    var errors = Party.prototype.validateForUpdate.call(this);
    // Person-specific validation code
    var specificValidations = [
        this.validateSalutation(false),
        this.validateFirstName(true),
        this.validateMiddleName(false),
        this.validateLastName(true),
        this.validateBirthDate(false),
        this.validateComments(false)
    ];
    
    for(var i=0; i < specificValidations.length; i++) {
        if(specificValidations[i]) {
            errors.push(specificValidations[i]);
        }
    }
    return errors;
};

// salutation is varchar(100)
Person.prototype.validateSalutation = function(isRequired) {
    this.salutation = validation.sanitizeInput(this.salutation);
    var validationResult = validation.validateString(this.salutation, isRequired, 100, 'salutation');
    return validationResult;
};

// firstName is varchar(100)
Person.prototype.validateFirstName = function(isRequired) {
    this.firstName = validation.sanitizeInput(this.firstName);
    var validationResult = validation.validateString(this.firstName, isRequired, 100, 'firstName');
    return validationResult;
};

// middleName is varchar(100)
Person.prototype.validateMiddleName = function(isRequired) {
    this.middleName = validation.sanitizeInput(this.middleName);
    var validationResult = validation.validateString(this.middleName, isRequired, 100, 'middleName');
    return validationResult;
};

// lastName is varchar(100)
Person.prototype.validateLastName = function(isRequired) {
    this.lastName = validation.sanitizeInput(this.lastName);
    var validationResult = validation.validateString(this.lastName, isRequired, 100, 'lastName');
    return validationResult;
};

// birthDate is datetime
Person.prototype.validateBirthDate = function(isRequired) {
    this.birthDate = validation.sanitizeInput(this.birthDate);
    var validationResult = validation.validateDate(this.birthDate, isRequired, 'birthDate');
    return validationResult;
};

// comments is varchar(255)
Person.prototype.validateComments = function(isRequired) {
    this.comments = validation.sanitizeInput(this.comments);
    var validationResult = validation.validateString(this.comments, isRequired, 255, 'comments');
    return validationResult;
};

// Export the class as a module
module.exports = Person;