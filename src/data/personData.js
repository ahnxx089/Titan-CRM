/////////////////////////////////////////////////
// Data access layer module for persons.
//
// @file:   personData.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var personData = function (knex) {

    /**
     * Add a new person in database-- this requires inserting into the 
     * party table first, in order to autogenerate the unique party_id
     * that is then the primary key for the insert to the person table
     *
     * @param {Object} person - The new person entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addPerson = function (person) {
        return knex('party')
            .returning('party_id')
            .insert({
                party_type_id: person.partyTypeId,
                preferred_currency_uom_id: person.preferredCurrencyUomId,
                description: person.description,
                status_id: person.statusId,
                created_by: person.createdBy,
                created_date: person.createdDate,
                updated_date: person.updatedDate
            })
            .then(function (party_id) {
                return knex('person').insert({
                    party_id: party_id,
                    salutation: person.salutation,
                    first_name: person.firstName,
                    middle_name: person.middleName,
                    last_name: person.lastName,
                    birth_date: person.birthDate,
                    comments: person.comments,
                    created_date: person.createdDate,
                    updated_date: person.updatedDate
                });
            });
    };

    return {
        addPerson: addPerson
    };
};

module.exports = personData;
