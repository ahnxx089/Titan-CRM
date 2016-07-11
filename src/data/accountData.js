/////////////////////////////////////////////////
// Data access layer for accounts.
//
// @file:   accountData.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */
/* jshint maxlen:1000 */

/* TODO: add a method or two for copying a lead's party_supplemental_data values into 
the newly created entry in that table, then deleting the account-related fields in the new entry. 
This is referring to #4 on slide 18.
*/
var winston = require('winston');


var accountData = function (knex) {
    var contactMechController = require('../data/contactMechData')(knex);
    var orgData = require('../data/organizationData')(knex);
    var partyData = require('../data/partyData')(knex);
    
    var addAccountParty = function (account) {
        return partyData.addParty(account);
//        promise.catch(function (error) {
//                winston.error(error);
//            });
//        return promise;
    };
    
    var addAccountOrg = function (account) {
        return orgData.addOrganization(account);
    };
    
    var addAccountPartySupplementalData = function (account) {
        //EMPTY FOR NOW - UNCLEAR ON WHAT MUST GO HERE THAT 
        //WOULDN'T GO INTO orgData.addOrganization
        return knex.insert({
            party_id: account.partyId,
            parent_party_id: account.parentPartyId,
            company_name: account.companyName, //Put in company name here maybe?
            annual_revenue: account.annualRevenue,
            currency_uom_id: account.preferredCurrencyUomId,
            num_employees: account.numEmployees,
            industry_enum_id: account.industryEnumId,
            ownership_enum_id: account.ownershipEnumId,
            ticker_symbol: account.tickerSymbol,
            important_note: account.importantNote,
            primary_postal_address_id: null, //account.primaryPostalAddressId,
            primary_telecom_number_id: null, //account.primaryTelecomNumberId,
            primary_email_id: null, //account.primaryEmailId,
            created_date: account.createdDate, //this may be incorrect and need to be changed
            updated_date: account.updatedDate
        }).into('party_supplemental_data');
    };
    
    var addAccountContactMech = function (account) {
        return contactMechController.addContactMech(account);
    };
    
    var addAccountPartyRole = function (account) {
        
        //If creating a new account, take the partyId of that account. 
        //If converting a contact/organization into a lead/account, take the partyId of the newly converted party. 
        //Then add an entry to the party_role table, using the above partyId value in the party_id column,
        //and "account" as the value in the role_type_id column.
        return knex.insert({
            party_id: account.partyId,
            role_type_id: 'ACCOUNT',
            created_date: account.createdDate,
            updated_date: account.updatedDate
        }).into('party_role');
    };
    
    var addAccountPartyRelationship = function (account, user, contact) {

        //Check if the user is converting a lead 
        //at an organization  into a contact (and thus converting the
        //organization into an account), or creating a new account from scratch.
        
        //If it is the first case, then the value of Role_Type_Id_From should be set to "contact". 
        //Role_Type_Id_To should then be set to "account". From_Date should be set to the datetime when the 
        //organization was converted. Party_Id_To should then be set to the new partyId of the account
        //(which should have been created by addAccountParty above). 
        
        //NOTE: right now, no upper-layer functions actually send in a contact 
        //object when calling this function
        if (contact) {
            return knex.insert({
                party_id_from: contact.partyId,
                party_id_to: account.partyId,
                role_type_id_from: 'CONTACT',
                role_type_id_to: 'ACCOUNT',
                from_date: account.createdDate,
                thru_date: null,
                status_id: null,
                party_relationship_type_id: 'CONTACT_REL_INV',
                created_date: account.createdDate,
                updated_date: account.updatedDate
            }).into('party_relationship');
        }
            
        
        
        //If it is the second case, then the value of Role_Type_Id_From should be set directly to "account". 
        //Role_Type_Id_To should then be set to "account_manager". From_Date should be set to the same value 
        //as Created_Date. Party_Id_To may be set to "admin" or the partyId of the user who made the change, 
        //if we want to create this functionality. This last bit is optional.
        else {
            return knex.insert({
                party_id_from: account.partyId,
                party_id_to: user.partyId,
                role_type_id_from: 'ACCOUNT',
                role_type_id_to: 'PERSON_ROLE',
                from_date: account.createdDate,
                thru_date: null,
                status_id: null,
                party_relationship_type_id: 'RESPONSIBLE_FOR',
                created_date: account.createdDate,
                updated_date: account.updatedDate
            }).into('party_relationship');
        }
    };

    
    var addAccount = function (account, user, contact) {
        //Call all of the previous addAccount___ methods. 
        return addAccountParty(account)
            .then(function (accountResults) {
                account.partyId = parseInt(accountResults[0]);
                return addAccountOrg(account)
                    .then(function (OrgResults) {
                        return addAccountPartySupplementalData(account)
                            .then(function (PartySupplementalDataResults) {
                                //previously had the addAccountContactMech function call here. Removed for now, with the controller handling that logic.
                                return addAccountPartyRole(account)
                                    .then(function (PartyRoleResults) {
                                        return addAccountPartyRelationship(account, user, contact)
                                            .then(function (results) {
                                                return account.partyId;
                                            });
                                    });

                            });
                    });
            });
    };
    
    /** 
     * Gets all accounts associated with an owner from database
     * @param {Number} ownerId - This is the party_id of the owner
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getAccountsByOwner = function (ownerId) {
        return knex.select('party_supplemental_data.party_id', 'party_supplemental_data.parent_party_id', 'company_name', 'organization.organization_name', 'organization.office_site_name', 'party_supplemental_data.annual_revenue',
            'party_supplemental_data.currency_uom_id', 'party_supplemental_data.num_employees', 'industry_enum_id', 'ownership_enum_id',
            'party_supplemental_data.ticker_symbol', 'organization.comments',
            'important_note', 'primary_postal_address_id', 'primary_telecom_number_id', 'primary_email_id',
            'party_supplemental_data.created_date', 'party_supplemental_data.updated_date', 'organization.logo_image_url', 'party.description', 'party.status_id')
            .from('party_supplemental_data')
            .innerJoin('organization', 'party_supplemental_data.party_id', 'organization.party_id')
            .innerJoin('party_relationship', 'party_supplemental_data.party_id', 'party_relationship.party_id_from')
            .innerJoin('party', 'party_supplemental_data.party_id', 'party.party_id')
            .where('party_relationship.party_id_to', ownerId)
            .andWhere('party_relationship.role_type_id_from', 'ACCOUNT')
            .andWhere('party_relationship.party_relationship_type_id', 'RESPONSIBLE_FOR');
    };
    /**
     * Gets one account by its id from database
     * @param {Number} accountId - Unique id of the account to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getAccountById = function (accountId) {
        return knex.select('party.party_id', 'parent_party_id', 'preferred_currency_uom_id', 'party.description', 'status_id', 'party.created_by', 'organization.organization_name', 'organization.office_site_name', 'party_supplemental_data.company_name', 'party_supplemental_data.annual_revenue',
        'party_supplemental_data.currency_uom_id', 'party_supplemental_data.num_employees', 'party_supplemental_data.industry_enum_id', 'party_supplemental_data.ownership_enum_id', 'party_supplemental_data.ticker_symbol',
        'party_supplemental_data.important_note', 'party_supplemental_data.primary_postal_address_id', 'party_supplemental_data.primary_telecom_number_id', 'party_supplemental_data.primary_email_id',
        'party.created_date', 'party.updated_date', 'organization.logo_image_url', 'organization.comments')
            .from('party')
            .innerJoin('party_supplemental_data', 'party.party_id', 'party_supplemental_data.party_id')
            .innerJoin('organization', 'party_supplemental_data.party_id', 'organization.party_id')
            .innerJoin('party_role', 'party_supplemental_data.party_id',  'party_role.party_id')
            .where('party.party_id', accountId)
            .andWhere('party_role.role_type_id', 'account');
    };
    /**
     * Gets one account by its phone number from database
     * @param {Number} phoneNumber - Unique phone number of the account to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getAccountByPhoneNumber = function (phoneNumber) {
        //TELECOM_NUMBER is the value of the contactmechtypeId where we want to join table entries
        //Is there really a telecom_number table in our titan_crm database? contactData mentions that there 
        //is, but I haven't seen one anywhere...
        
        return knex.select('party_supplemental_data.party_id', 'parent_party_id', 'company_name', 'party_supplemental_data.annual_revenue',
            'currency_uom_id', 'party_supplemental_data.num_employees', 'industry_enum_id', 'ownership_enum_id', 'party_supplemental_data.ticker_symbol',
            'important_note', 'primary_postal_address_id', 'primary_telecom_number_id', 'primary_email_id',
            'party_supplemental_data.created_date', 'party_supplemental_data.updated_date', 'organization.logo_image_url')
            .from('party_supplemental_data')
            .innerJoin('organization', 'party_supplemental_data.party_id', 'organization.party_id')
            .innerJoin('party_relationship', 'party_supplemental_data.party_id', 'party_relationship.party_id_from')
            .where('primary_telecom_number_id', phoneNumber);
    };
    
    var getAccountsByIdentity = function (accountId, accountName) {
        var findQuery = knex.select('party.party_id', 'parent_party_id', 'preferred_currency_uom_id', 'description', 'status_id', 'created_by', 'organization.organization_name','party_supplemental_data.company_name', 'party_supplemental_data.annual_revenue',
        'party_supplemental_data.currency_uom_id', 'party_supplemental_data.num_employees', 'party_supplemental_data.industry_enum_id', 'party_supplemental_data.ownership_enum_id', 'party_supplemental_data.ticker_symbol',
        'party_supplemental_data.important_note', 'party_supplemental_data.primary_postal_address_id', 'party_supplemental_data.primary_telecom_number_id', 'party_supplemental_data.primary_email_id',
        'party.created_date', 'party.updated_date', 'organization.organization_name', 'organization.logo_image_url')
            .from('party')
            .innerJoin('party_supplemental_data', 'party.party_id', 'party_supplemental_data.party_id')
            .innerJoin('organization', 'party_supplemental_data.party_id', 'organization.party_id')
            .innerJoin('party_role', 'party_supplemental_data.party_id',  'party_role.party_id');

        if (accountId) {
            return findQuery.where('party.party_id', accountId);
        }
        if (accountName) {
            return findQuery.where('organization_name', 'like', '%' + accountName + '%');
        }
    };


    /**
     * Update an account in database
     * @param {Object} account - The account entity that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateAccount = function (account) {
        return knex('party_supplemental_data')
            .where({
                party_id: account.partyId
            })
            .update({})
            .then(function (supplementPart) {
                return knex('party_relationship')
                    .where({
                        party_id_from: account.partyId
                    })
                    .orWhere({
                        party_id_to: account.partyId
                    })
                    .update({})
                    .then(function (relationshipPart) {
                        return knex('party_role')
                            .where({
                                party_id: account.partyId
                            })
                            .update({})
                            .then(function (organizationPart) {
                                return knex('organization')
                                    .where({
                                        party_id: account.partyId
                                    })
                                    .update({})
                                    .then(function (personPart) {
                                        return knex('party')
                                            .where({
                                                party_id: account.partyId
                                            })
                                            .update({})
                                            .then(function (partyPart) {
                                                return partyPart + personPart + organizationPart + relationshipPart + supplementPart;
                                            });
                                    });
                            });
                    });
            });
    };
    /**
     * Delete an account from database
     * @param {Number} accountId - Unique id of the account to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteAccount = function (accountId) {
        return knex('party_supplemental_data')
            .where({
                party_id: accountId
            })
            .del()
            .then(function (supplementPart) {
                return knex('party_relationship')
                    .where({
                        party_id_from: accountId
                    })
                    .orWhere({
                        party_id_to: accountId
                    })
                    .del()
                    .then(function (relationshipPart) {
                        return knex('party_role')
                            .where({
                                party_id: accountId
                            })
                            .del()
                            .then(function (organizationPart) {
                                return knex('organization')
                                    .where({
                                        party_id: accountId
                                    })
                                    .del()
                                    .then(function (personPart) {
                                        return knex('party')
                                            .where({
                                                party_id: accountId
                                            })
                                            .del()
                                            .then(function (partyPart) {
                                                return partyPart + personPart + organizationPart + relationshipPart + supplementPart;
                                            });
                                    });
                            });
                    });
            });
    };
    
    return {
        addAccount: addAccount,
        getAccountsByOwner: getAccountsByOwner,
        getAccountById: getAccountById,
        getAccountByPhoneNumber: getAccountByPhoneNumber,
        getAccountsByIdentity: getAccountsByIdentity,
        updateAccount: updateAccount,
        deleteAccount: deleteAccount
    };
    

};

module.exports = accountData;