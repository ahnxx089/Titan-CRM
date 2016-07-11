/////////////////////////////////////////////////
// Note entity.
// Properties and validation methods.
//
// @file:    note.js
// @authors: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint maxparams: false */

var validation = require('../common/validation')();

// Constructor
//
function Note(noteId, noteName, noteInfo, noteDateTime, noteParty, createdDate, updatedDate) {

    // Properties
    this.noteId = noteId;
    this.noteName = noteName;
    this.noteInfo = noteInfo;
    this.noteDateTime = noteDateTime;
    this.noteParty = noteParty;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    
}

// needed?
// Commented June 25
// Note.prototype.constructor = Note;

// Methods
//
Note.prototype.validateForInsert = function () {
    
    // Perform general validations
    var validations = [
//            this.validateNoteId(true),
            this.validateNoteName(false),
            this.validateNoteInfo(false),
            this.validateNoteDateTime(false),
            this.validateNoteParty(false),
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

// This is not in use now. 
Note.prototype.validateForUpdate = function () {
    
    // Perform general validations
    var validations = [
            this.validateNoteId(true),
            this.validateNoteName(false),
            this.validateNoteInfo(false),
            this.validateNoteDateTime(false),
            this.validateNoteParty(false),
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

// note_id is int(11)
Note.prototype.validateNoteId = function (isRequired) {
    this.noteId = validation.sanitizeInput(this.noteId);
    var validationResult = validation.validateInt(this.noteId, isRequired, 11, 'noteId');
    if(this.noteId && !validationResult) {
        this.noteId = validation.convertToInt(this.noteId);
    }
    return validationResult;
};

// note_name is varchar(100)
Note.prototype.validateNoteName = function (isRequired) {
    this.noteName = validation.sanitizeInput(this.noteName);
    var validationResult = validation.validateString(this.noteName, isRequired, 100, 'noteName');
    return validationResult;
};

// note_info is longtext (max length is 4,294,967,295)
Note.prototype.validateNoteInfo = function(isRequired) {
    this.noteInfo = validation.sanitizeInput(this.noteInfo);
    var validationResult = validation.validateString(this.noteInfo, isRequired, 4294967295, 'noteInfo');
    return validationResult;
};

// note_date_time is date
Note.prototype.validateNoteDateTime = function(isRequired) {
    this.noteDateTime = validation.sanitizeInput(this.noteDateTime);
    var validationResult = validation.validateDate(this.noteDateTime, isRequired, 'noteDateTime');
    return validationResult;
};

// note_party is int(11)
Note.prototype.validateNoteParty = function(isRequired) {
    this.noteParty = validation.sanitizeInput(this.noteParty);
    var validationResult = validation.validateInt(this.noteParty, isRequired, 'noteParty');
    if(this.noteParty && !validationResult) {
        this.noteParty = validation.convertToInt(this.noteParty);
    }
    return validationResult;
};

// created_date is date
Note.prototype.validateCreatedDate = function(isRequired) {
    this.createdDate = validation.sanitizeInput(this.createdDate);
    var validationResult = validation.validateDate(this.createdDate, isRequired, 'createdDate');
    return validationResult;
};

// updated_date is date
Note.prototype.validateUpdatedDate = function(isRequired) {
    this.updatedDate = validation.sanitizeInput(this.updatedDate);
    var validationResult = validation.validateDate(this.updatedDate, isRequired, 'updatedDate');
    return validationResult;
};

// Export the class as a module
module.exports = Note;