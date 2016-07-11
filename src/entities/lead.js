/////////////////////////////////////////////////
// Lead entity.
// Inherits from Person.
// Properties and validation methods.
//
// @file:   lead.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint maxparams: false */

// NOT COMPLETED! 
// Need work on validateForUpdate, and validateAnnualRevenue.
// Need more fields.

var validation = require('../common/validation')();
var Person = require('../entities/person');
var ContactMech = require('../entities/contactMech');

// Constructor
// Lead is a Person, which is a Party
// Party -> Person -> Lead
// not all specified parameters in ARC are passed or used here in this constructor
function Lead(partyId, /*PK, SHARED #1 */
               partyTypeId, /*FK #2, party_type.party_type_id, in this case a PERSON */
               currencyUomId, /*FK #3, uom.uom_id */
               description, 
               statusId, /*FK #4, status_item.status_id */
               createdBy, /*FK #5, user_login.user_login_id */
               createdDate, updatedDate, /* SHARED 6,7 */
               // for Party
               
               salutation, firstName, middleName, lastName, birthDate, comments, 
               // Use SHARED #1,6,7
               // for Person
               
               parentPartyId, companyName, annualRevenue, numEmployees, 
               
               industryEnumId, /*FK #8, enumeration.enum_id */
               ownershipEnumId, /*FK #9, enumeration.enum_id */ 
               tickerSymbol, 
               importantNote,
               
//               primaryPostalAddressId, /*FK #10, contact_mech.contact_mech_id */
//               primaryTelecomNumberId, /*FK #11, contact_mech.contact_mech_id */
//               primaryEmailId, /*FK #12, contact_mech.contact_mech_id */
               
               // Use SHARED #1,3,6,7
               // for party_supplemental_data. 
               
               roleTypeId, /*FK #13, role_type.role_type, in this case a LEAD */
               // Use SHARED #1,6,7
               // for party_role
               
               partyContactMechs
//               contactMechId, /*FK #14, contact_mech.contact_mech_id */
//               contactMechPurposeTypeId, /*FK #15, contact_mech_purpose_type.contact_mech_purpose_type_id */
//               fromDate,
//               thruDate,
//               verified,
//               pc_comments
               // Use SHARED #1,6,7
               
               // I DONT UNDERSTAND party_id_to, and party_id_from. (party_relationship table)
               // They are linking to party_role, that is an empty table. 
               // How am I supposed to refer to null values?
               // for party_relationship. Several (less useful or interesting) and nullable fields were omitted. 
               
               // some other fileds are optional and not included in this constructor but in contactMech constructor
              ) {

    Person.call(this, partyId, partyTypeId, currencyUomId, description,
               statusId, createdBy, createdDate, updatedDate,
               salutation, firstName, middleName, lastName, birthDate, comments
               );
    
    // Lead-specific Properties
    this.parentPartyId = parentPartyId;
    this.companyName = companyName;
    this.annualRevenue = annualRevenue;
    this.numEmployees = numEmployees;
    
    this.industryEnumId = industryEnumId; 
    this.ownershipEnumId = ownershipEnumId;
    this.tickerSymbol = tickerSymbol;
    this.importantNote = importantNote; 
//    this.primaryPostalAddressId = primaryPostalAddressId;
//    this.primaryTelecomNumberId = primaryTelecomNumberId;
//    this.primaryEmailId = primaryEmailId;
    this.roleTypeId = roleTypeId;
    
    this.partyContactMechs = partyContactMechs;
//    this.contactMechId = contactMechId;
//    this.contactMechPurposeTypeId = contactMechPurposeTypeId;
//    this.fromDate = fromDate;
//    this.thruDate = thruDate;
//    this.verified = verified;
//    this.pc_comments = pc_comments;
    // these 6 are not validated
}


// Inherit from Person (and automatically implictly from Party, maybe? YES!)
//
Lead.prototype = Object.create(Person.prototype);

// Set the "constructor" property to refer to Lead
Lead.prototype.constructor = Lead;



// Methods
//
Lead.prototype.validateForInsert = function () {
    // Call Person's validation function
    var errors = Person.prototype.validateForInsert.call(this);
    
// Lead-specific validation code
    var specificValidations = [
        // true means required, false means nullable
        this.validateParentPartyId(true),
        this.validateCompanyName(false),
        this.validateAnnualRevenue(false),
        this.validateNumEmployees(false),
        
        this.validateIndustryEnumId(false), 
        this.validateOwnershipEnumId(false),
        this.validateTickerSymbol(false),
        this.validateImportantNote(false), 
//        this.validatePrimaryPostalAddressId(false),
//        this.validatePrimaryTelecomNumberId(false),
//        this.validatePrimaryEmailId(false), 
        this.validateRoleTypeId(true)
    ]; 
    
    // The "errors" array is "validations" array
    // with empty string elements weeded out
    // If all validations succeed,
    // "errors" will have 0 elements.
    for(var i=0; i < specificValidations.length; i++) {
        if(specificValidations[i]) {
            errors.push(specificValidations[i]);
        }
    }
    return errors;
    
};

// NOT FINISHED YET
Lead.prototype.validateForUpdate = function () {
    // Call Person's validation function
    var errors = Person.prototype.validateForUpdate.call(this);
    // Person-specific validation code
    var specificValidations = [
    ];
    
    return errors;
};


// parentPartyId is int(11)
Person.prototype.validateParentPartyId = function(isRequired) {
    this.parentPartyId = validation.sanitizeInput(this.parentPartyId);
    var validationResult = validation.validateInt(this.parentPartyId, isRequired, 'parentPartyId');
    if(this.parentPartyId && !validationResult) {
        this.parentPartyId = validation.convertToInt(this.parentPartyId);
    }
    return validationResult;
};

// companyName is varchar(100)
Person.prototype.validateCompanyName = function(isRequired) {
    this.companyName = validation.sanitizeInput(this.companyName);
    var validationResult = validation.validateString(this.companyName, isRequired, 100, 'companyName');
    return validationResult;
};

// annualRevenue is decimal(18,2) but we are doing floats without any limits now 
Person.prototype.validateAnnualRevenue = function(isRequired) {
    this.annualRevenue = validation.sanitizeInput(this.annualRevenue);
    var validationResult = validation.validateFloat(this.annualRevenue, isRequired, 'annualRevenue');
    if(this.annualRevenue && !validationResult) {
        this.annualRevenue = validation.convertToFloat(this.annualRevenue);
    }
    return validationResult;
};

// numEmployees is decimal(20,0) == int(20)
Person.prototype.validateNumEmployees = function(isRequired) {
    this.numEmployees = validation.sanitizeInput(this.numEmployees);
    var validationResult = validation.validateInt(this.numEmployees, isRequired, 'numEmployees');
    if(this.numEmployees && !validationResult) {
        this.numEmployees = validation.convertToInt(this.numEmployees);
    }
    return validationResult;
};

// industryEnumId is varchar(20)
Person.prototype.validateIndustryEnumId = function(isRequired) {
    this.industryEnumId = validation.sanitizeInput(this.industryEnumId);
    var validationResult = validation.validateString(this.industryEnumId, isRequired, 20, 'industryEnumId');
    return validationResult;
};

// ownershipEnumId is varchar(20)
Person.prototype.validateOwnershipEnumId = function(isRequired) {
    this.ownershipEnumId = validation.sanitizeInput(this.ownershipEnumId);
    var validationResult = validation.validateString(this.ownershipEnumId, isRequired, 20, 'ownershipEnumId');
    return validationResult;
};

// tickerSymbol is varchar(20)
Person.prototype.validateTickerSymbol = function(isRequired) {
    this.tickerSymbol = validation.sanitizeInput(this.tickerSymbol);
    var validationResult = validation.validateString(this.tickerSymbol, isRequired, 20, 'tickerSymbol');
    return validationResult;
};

// importantNote is longtext (max length is 4,294,967,295)
Person.prototype.validateImportantNote = function(isRequired) {
    this.importantNote = validation.sanitizeInput(this.importantNote);
    var validationResult = validation.validateString(this.importantNote, isRequired, 4294967295, 'importantNote');
    return validationResult;
};

/*
// primaryPostalAddressId is int(11)
Person.prototype.validatePrimaryPostalAddressId = function(isRequired) {
    this.primaryPostalAddressId = validation.sanitizeInput(this.primaryPostalAddressId);
    var validationResult = validation.validateInt(this.primaryPostalAddressId, isRequired, 'primaryPostalAddressId');
    if(this.primaryPostalAddressId && !validationResult) {
        this.primaryPostalAddressId = validation.convertToInt(this.primaryPostalAddressId);
    }
    return validationResult;
};

// primaryTelecomNumberId is int(11)
Person.prototype.validatePrimaryTelecomNumberId = function(isRequired) {
    this.primaryTelecomNumberId = validation.sanitizeInput(this.primaryTelecomNumberId);
    var validationResult = validation.validateInt(this.primaryTelecomNumberId, isRequired, 'primaryTelecomNumberId');
    if(this.primaryTelecomNumberId && !validationResult) {
        this.primaryTelecomNumberId = validation.convertToInt(this.primaryTelecomNumberId);
    }
    return validationResult;
};

// primaryEmailId is int(11)
Person.prototype.validatePrimaryEmailId = function(isRequired) {
    this.primaryEmailId = validation.sanitizeInput(this.primaryEmailId);
    var validationResult = validation.validateInt(this.primaryEmailId, isRequired, 'primaryEmailId');
    if(this.primaryEmailId && !validationResult) {
        this.primaryEmailId = validation.convertToInt(this.primaryEmailId);
    }
    return validationResult;
};
*/

// roleTypeId is varchar(20)
Person.prototype.validateRoleTypeId = function(isRequired) {
    this.roleTypeId = validation.sanitizeInput(this.roleTypeId);
    var validationResult = validation.validateString(this.roleTypeId, isRequired, 20, 'roleTypeId');
    return validationResult;
};

// Export the class as a module
module.exports = Lead;