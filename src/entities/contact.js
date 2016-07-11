/////////////////////////////////////////////////
// Contact entity.
// Inherits from Person.
// Properties and validation methods.
//
// @file:    contact.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
//           William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();
var Person = require('../entities/person');
var ContactMech = require('../entities/contactMech');

// Constructor
//
function Contact(partyId, partyTypeId, currencyUomId, description,
    statusId, createdBy, createdDate, updatedDate, salutation, firstName,
    middleName, lastName, birthDate, comments) {

    // Call the parent constructor (Person), making sure
    // that "this" is set correctly during the call
    Person.call(this, partyId, partyTypeId, currencyUomId, description,
        statusId, createdBy, createdDate, updatedDate,
        salutation, firstName, middleName, lastName, birthDate, comments);

    //
    this.contactMechs = [];
}

// Inherit from Person
//
Contact.prototype = Object.create(Person.prototype);

// Set the "constructor" property to refer to Contact
Contact.prototype.constructor = Contact;

// Methods
//
Contact.prototype.validateForInsert = function () {
    //Run parent validation method
    var validations = Person.prototype.validateForInsert.call(this);

    //Errors are non-empty validation results
    var errors = [];
    if (validations) {
        for (var i = 0; i < validations.length; i++) {
            if (validations[i]) {
                errors.push(validations[i]);
            }
        }
    }

    return errors;

};

Contact.prototype.validateForUpdate = function () {
    //Run parent validation method
    var validations = Person.prototype.validateForUpdate.call(this);

    //Errors are non-empty validation results
    var errors = [];
    for (var i = 0; i < validations.length; i++) {
        if (validations[i]) {
            errors.push(validations[i]);
        } else {
            console.log(validations[i]);
        }
    }

    return errors;
};

// Export the class as a module
module.exports = Contact;