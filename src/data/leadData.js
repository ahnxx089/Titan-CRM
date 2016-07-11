/////////////////////////////////////////////////
// Data access layer module for leads.
//
// @file:   leadData.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

/* jshint camelcase: false */

// Attention!
// addLead, getLeadById, getLeadsByOwner are tested and functional. 
// getLeads may need revision. It is not used now. Don't remove yet. 
// deleteLead, updateLead, getLeadsByPhoneNumber and getLeadsByIdentity are wrong and deleted now since June 25. 

var leadData = function (knex) {


    // DATA METHODS
    /**
     * Methods in XXXdata.js are called from Controller layer,
     * They accept entities which to be into database, from controllers. 
     * They also query the database based on the creteria from controllers, and giving back (queried) columns to controllers. 
     */
    // ==========================================
    //


    // Author: Lucas
    /**
     * Add a new lead in database
     * @param {Object} lead - The new lead entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted (in other words, lead id)
     */
    var addLead = function (lead) {
        // this achieves goals mentioned on slide # 17
        // #1, 2, 3, 4, 5, 6: good
        // #7(party_relationship) is NOT implemented at this moment. Lucas has no plan on doing this in the near future. 


        //NOTE TO LUCAS AND DIVINE: Below changes to this function were made by Eric to resolve errors crashing the app
        //Thank you from Lucas and Divine.
        return knex('party')
            .returning('party_id')
            .insert({
                // ok to put dummy data here
                party_type_id: lead.partyTypeId, 
                preferred_currency_uom_id: lead.preferredCurrencyUomId,
                description: lead.description,
                status_id: lead.statusId,
                created_by: lead.createdBy,
                created_date: lead.createdDate,
                updated_date: lead.updatedDate
            })
            .then(function (res) {
                return knex('person')
                    .returning('party_id')
                    .insert({
                        party_id: res[0],
                        salutation: lead.salutation,
                        first_name: lead.firstName,
                        middle_name: lead.middleName,
                        last_name: lead.lastName,
                        birth_date: lead.birthDate,
                        comments: lead.comments,
                        created_date: lead.createdDate,
                        updated_date: lead.updatedDate
                    })
            .then(function () {
                return knex('party_supplemental_data')
                    //.returning('party_id')
                    .insert({
                        party_id: res[0],
                        parent_party_id: lead.parentPartyId,
                        company_name: lead.companyName,
                        annual_revenue: lead.annualRevenue,
                        currency_uom_id: lead.preferredCurrencyUomId, // the same. Was renamed.
                        num_employees: lead.numEmployees,
                        created_date: lead.createdDate,
                        updated_date: lead.updatedDate, 
                        
                        industry_enum_id: lead.industryEnumId,
                        ownership_enum_id: lead.ownershipEnumId,
                        ticker_symbol: lead.tickerSymbol,
                        important_note: lead.importantNote
//                        the three columns commented out below, were not to be populated here but in updatePSD.
//                        primary_postal_address_id: lead.primaryPostalAddressId,
//                        primary_telecom_number_id: lead.primaryTelecomNumberId,
//                        primary_email_id: lead.primaryEmailId
                    })
            .then(function () {
                return knex('party_role')
                    .insert({
                        party_id: res[0],
                        role_type_id: lead.roleTypeId, // Replaced this dummy data in controller layer
                        created_date: lead.createdDate,
                        updated_date: lead.updatedDate
                    })
             .then(function() {
                   return res[0];
                    });
            });
            });
            });
    };
    
    // Author: Lucas
    /**
     * Update three contact info fields in party_supplemental_data table, upon the creation of a lead 
     * Link this column to party_contact_mech.contact_mech_id
     * @param {Number} partyid - Unique id of the party (grandparent of lead)
     * @param {Object} contactMechId - Unique id of the contact mechanism of the lead
     * @param {String} purposeTypeId - Purpose type id of a contact mechanism
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updatePSD = function (partyId, contactMechId, purposeTypeId) {
        if(purposeTypeId === 'PRIMARY_EMAIL') {
            return knex('party_supplemental_data')
                .where({
                    party_id: partyId
                })
                .update({
                    primary_email_id: contactMechId
                });
        }
        else if(purposeTypeId === 'PRIMARY_LOCATION') {
            return knex('party_supplemental_data')
                .where({
                    party_id: partyId
                })
                .update({
                    primary_postal_address_id: contactMechId
                });
        }
        else if(purposeTypeId === 'PRIMARY_PHONE') {
            return knex('party_supplemental_data')
                .where({
                    party_id: partyId
                })
                .update({
                    primary_telecom_number_id: contactMechId
                });
        }
    };
    

    // Author: Lucas
    /**
     * Gets all leads from database
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     * THIS FUNCTION IS OBSOLETE. Need revision or removal. Possibly will be used once getLeads is to be implemeted in controller and API layer. 
     */
    var getLeads = function () {
        return knex.select('party_id', 'salutation', 'first_name', 'middle_name', 'last_name', 'birth_date', 'comments', 'created_date', 'updated_date')
            .from('person');
    };

    // Author: Lucas
    /**
     * Gets one lead by its id from database. This GET will JOIN more than 3 tables and contain many details. 
     * @param {Number} partyId - Unique id of the party (grandparent of lead) to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getLeadById = function (id) {
        return knex.select('person.party_id', 'person.salutation', 'person.first_name', 'person.middle_name',
                           'person.last_name', 'person.birth_date', 'person.comments as p_comments', 'person.created_date', 'person.updated_date',
                           'party.party_type_id', 'party.preferred_currency_uom_id', 'party.description', 'party.status_id', 
                           'party.created_by', 
                           'party_supplemental_data.parent_party_id', 'party_supplemental_data.company_name', 
                           'party_supplemental_data.annual_revenue', 'party_supplemental_data.num_employees',
                           'party_supplemental_data.industry_enum_id', 'party_supplemental_data.ownership_enum_id',
                           'party_supplemental_data.ticker_symbol', 'party_supplemental_data.important_note',
                           'party_role.role_type_id',
                           'party_contact_mech.contact_mech_id', 'party_contact_mech.contact_mech_purpose_type_id', 
                           'party_contact_mech.from_date', 'party_contact_mech.thru_date', 'party_contact_mech.verified',
                           'party_contact_mech.comments',
                           'contact_mech.contact_mech_id', 'contact_mech.contact_mech_type_id', 'contact_mech.info_string',
                           'telecom_number.country_code', 'telecom_number.area_code', 'telecom_number.contact_number', 'telecom_number.ask_for_name',
                           'postal_address.to_name', 'postal_address.attn_name', 'postal_address.address1',
                           'postal_address.address2', 'postal_address.directions', 'postal_address.city',
                           'postal_address.postal_code', 'postal_address.country_geo_id', 'postal_address.state_province_geo_id'
                          )
            .from('person')
            .innerJoin('party', 'person.party_id', 'party.party_id')
            .innerJoin('party_supplemental_data', 'person.party_id', 'party_supplemental_data.party_id')
            .innerJoin('party_role', 'person.party_id', 'party_role.party_id')
            // change to left join? 
            // Left join here would often result to a contactMech array with one empty (except datetime) contactMech
            .leftJoin('party_contact_mech', 'person.party_id', 'party_contact_mech.party_id')
            .leftJoin('contact_mech', 'party_contact_mech.contact_mech_id', '=', 'contact_mech.contact_mech_id')
            .leftJoin('telecom_number', 'contact_mech.contact_mech_id', '=', 'telecom_number.contact_mech_id')
            .leftJoin('postal_address', 'contact_mech.contact_mech_id', '=', 'postal_address.contact_mech_id')
            .where('person.party_id', id)
            .andWhere('party_role.role_type_id', 'LEAD');
    };


    // Author: Lucas
    /**
     * Gets leads by its owner (the one by whom they are created) from database
     * @param {Number} ownerId - Unique id of the owner of leads
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getLeadsByOwner = function (ownerId) {
        return knex.from('person')
            .innerJoin('party', 'person.party_id', 'party.party_id')
            .innerJoin('party_supplemental_data', 'person.party_id', 'party_supplemental_data.party_id')
            .innerJoin('party_role', 'person.party_id', 'party_role.party_id')
            //comment out because we dont want to show the very details of a lead (within byOwner)
//            .innerJoin('party_contact_mech', 'person.party_id', 'party_contact_mech.party_id')
            .where('party.created_by', ownerId);
    };

    return {
        addLead: addLead,
        getLeadsByOwner: getLeadsByOwner,
        getLeads: getLeads,
        getLeadById: getLeadById,
        updatePSD: updatePSD
//        updateLead: updateLead,
//        deleteLead: deleteLead
    };
};

module.exports = leadData;