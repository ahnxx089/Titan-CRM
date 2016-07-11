/////////////////////////////////////////////////
// Data access layer module for notes.
//
// @file:    noteData.js
// @authors: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint camelcase: false */

// Attention!
// Only addNote and linkNoteToCase are well-written, tested functional. 
// Other functions are not realised.

var noteData = function (knex) {

    /**
     * Add a new note in database
     * @param {Object} note - The new note entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addNote = function (note) {
        return knex
            .insert({
            note_name: note.noteName,
            note_info: note.noteInfo,
            note_date_time: note.noteDateTime,
            note_party: note.noteParty,
            created_date: (new Date()).toISOString(),
            updated_date: (new Date()).toISOString()
        })
            .into('note_data');
    };

    /**
     * Gets all notes from database
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getNotes = function () {
        return null;
    };


    /**
     * Gets all notes from database
     * @param {Number} partyId - Party ID of which the notes belong to 
     */
    var getNotesByParty = function (partyId) {
        return null;
    };



    /**
     * Gets one note by its id from database
     * @param {Number} noteId - Unique id of the note to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getNoteById = function (id) {
        return null;
        // below is commented because this method may be used later
        
//        return knex.select('contact_mech.contact_mech_id', 'contact_mech.contact_mech_type_id', 'contact_mech.info_string',
//                'contact_mech.created_date', 'contact_mech.updated_date', 'telecom_number.country_code',
//                'telecom_number.area_code', 'telecom_number.contact_number', 'telecom_number.ask_for_name',
//                'postal_address.to_name', 'postal_address.attn_name', 'postal_address.address1',
//                'postal_address.address2', 'postal_address.directions', 'postal_address.city',
//                'postal_address.postal_code', 'postal_address.country_geo_id', 'postal_address.state_province_geo_id')
//            .from('contact_mech')
//            .leftJoin('telecom_number', 'contact_mech.contact_mech_id', '=', 'telecom_number.contact_mech_id')
//            .leftJoin('postal_address', 'contact_mech.contact_mech_id', '=', 'postal_address.contact_mech_id')
//            .where({
//                contact_mech_id: id
//            });
    };

    /**
     * Update a note in database
     * @param {Object} note - The note entity that contains updated data
     */
    var updateNote = function (note) {
        return null;
    };

    /**
     * Delete a note from database
     * @param {Number} noteId - Unique id of the note mechanism to be deleted
     */
    var deleteNote = function (noteId) {
        return null;
    };

    /**
     * Map notes to cases
     * @param {Number} caseId - Unique id of the case to be deleted
     * @param {Number} noteId - Unique id of the note to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    // this is for the mapping table: case_note
    var linkNoteToCase = function (caseId, noteId) {
        return knex.insert({
                case_id: caseId,
                note_id: noteId,
                created_date: (new Date()).toISOString(),
                updated_date: (new Date()).toISOString()
            })
            .into('case_note');
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

module.exports = noteData;