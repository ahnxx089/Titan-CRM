/////////////////////////////////////////////////
// Business logic module for notes.
//
// @file:    noteController.js
// @authors: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint camelcase: false */

// Attention!
// Only addNote and linkNoteToCase are well-written, tested functional. 
// Other functions are not realised or returned.

var winston = require('winston');
var Note = require('../entities/note.js');

var noteController = function (knex) {
    // Get a reference to data layer module
    //
    var noteData = require('../data/noteData')(knex);

    /**
     * Add a new note
     * @param {Object} note - The new note to be added
     * @return {Object} promise - Fulfillment value is id of new party
     */
    var addNote = function (note) {
        // Convert the received object into an entity
        var noteEntity = new Note(
            note.noteId,
            note.noteName,
            note.noteInfo,
            note.noteDateTime,
            note.noteParty,
            note.createdDate,
            note.updatedDate
        );

        // Validate the data before going ahead
        var validationErrors = noteEntity.validateForInsert();
        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise;
            promise = noteData.addNote(noteEntity)
                .then(function (noteId) {
                    return noteId;
                });
            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return validationErrors;
        }
    };

    /**
     * Get all notes in the database
     * @return {object) promise - An array of JSON objects representing notes
     */
    var getNotes = function () {
        var promise = noteData.getNotes()
            .then(function (notes) {
                // Map the retrieved result set to corresponding entities
                var noteEntities = [];
                for (var i = 0; i < notes.length; i++) {
                    var note = new Note(
                        // TO BE FINISHED
                    );
                    noteEntities.push(note);
                }
                return noteEntities;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Get a list of notes associated with a particular party
     * @param {number} partyId - unique ID of the party
     * @return {object} - array of notes
     */
    var getNotesByParty = function (partyId) {
        var promise = noteData.getNotesByParty(partyId)
            .then(function (notes) {
                // Map the retrieved result set to corresponding entities
                var noteEntities = [];
                for (var i = 0; i < notes.length; i++) {
                    var note = new Note(
                        // TO BE FINISHED
                    );
                    noteEntities.push(note);
                }
                return noteEntities;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };


    var getNoteById = function (noteId) {
        var promise = noteData.getNoteById(noteId)
            .then(function (note) {
                // Map the retrieved result set to corresponding entity
                var noteEntity;
                if (note.length > 0) {
                    noteEntity = new Note(
                        // TO BE FINISHED
                    );
                }
                return noteEntity;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    /**
     * Update a note in database
     * @param {Number} noteId - Unique id of the note to be updated
     * @param {Object} note - The object that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateNote = function (noteId, note) {
        var noteEntity = new Note(
            // TO BE FINISHED
        );
        // Validate the data before going ahead
        var validationErrors = noteEntity.validateForUpdate();

        if (validationErrors.length === 0) {
            // Pass on the entity to be added to the data layer
            var promise = noteData.updateNote(noteEntity)
                .then(function (noteId) {
                    return noteId;
                });
            promise.catch(function (error) {
                winston.error(error);
            });
            return promise;
        } else {
            return null;
        }
    };

    /**
     * Delete a ntoe
     * @param {Number} noteId - Unique id of the note to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteNote = function (noteId) {
        var promise = noteData.deleteNote(noteId)
            .then(function (result) {
                return result;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    // this is for the mapping table: case_note
    var linkNoteToCase = function (caseId, noteId) {
        var promise = noteData.linkNoteToCase(caseId, noteId)
        // this .then is actually used. WHY and HOW? 
        // TODO: use console and debugger to show promise and its type, content, etc
            .then(function (result) {
                return caseId;
            });
        promise.catch(function (error) {
            // Log the error
            winston.error(error);
        });
        return promise;
    };

    return {
        addNote: addNote,
        linkNoteToCase: linkNoteToCase
//        MIGHT BE USED LATER:
//        getNotes: getNotes,
//        getNotesByParty: getNotesByParty,
//        getNoteById: getNoteById,
//        updateNote: updateNote,
//        deleteNote: deleteNote,
    };
};

module.exports = noteController;