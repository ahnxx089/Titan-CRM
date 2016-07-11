/////////////////////////////////////////////////
// Data access layer for organizations.
//
// @file:   organizationData.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */
var winston = require('winston');

var orgData = function (knex) {
    
    /**
     * Add a new organization in database  
     *
     * @param {Object} organization - The new organization entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
     */
    var addOrganization = function (organization) {
        return knex.insert({
            party_id: organization.partyId,
            organization_name: organization.orgName,
            office_site_name: organization.officeSiteName,
            annual_revenue: organization.annualRevenue,
            num_employees: organization.numEmployees,
            ticker_symbol: organization.tickerSymbol,
            comments: organization.comments,
            logo_image_url: organization.logoImgURL,
            created_date: organization.createdDate,
            updated_date: organization.updatedDate
        })
        .into('organization');
    };


    
        

    /**
     * Gets all organizations from database
     * @return {Object} promise - Fulfillment value is an array of raw data objects
     */
    var getOrganizations = function () {
        return knex.select('party_id', 'organization_name', 'office_site_name', 'annual_revenue', 'num_employees', 'ticker_symbol', 'comments', 'logo_image_url', 'created_date', 'updated_date')
            .from('organization');
    };
    /**
     * Gets one organization by its id from database
     * @param {Number} organizationId - Unique id of the organization to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getOrganizationById = function (id) {
        return knex.select('party_id', 'organization_name', 'office_site_name', 'annual_revenue', 'num_employees', 'ticker_symbol', 'comments', 'logo_image_url', 'created_date', 'updated_date')
            .from('organization')
            .where({party_id: id});
    };
    

    /**
     * Update an organization in database
     * @param {Object} organization - The organization entity that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
     */
    var updateOrganization = function(organization) {
            return knex('organization')
            .where({party_id: organization.partyId})
            .update({
                organization_name: organization.orgName,
                office_site_name: organization.officeSiteName,
                annual_revenue: organization.annualRevenue,
                num_employees: organization.numEmployees,
                ticker_symbol: organization.tickerSymbol,
                comments: organization.comments,
                logo_image_url: organization.logoImgURL,
                updated_date: (new Date()).toISOString()
            });
     };

    /**
     * Delete an organization from database
     * @param {Number} organizationId - Unique id of the organization to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
     */
    var deleteOrganization = function (organizationId) {
        return knex('organization')
            .where({party_id: organizationId})
            .del();
    };
    return {
        addOrganization: addOrganization,
        getOrganizations: getOrganizations,
        getOrganizationById: getOrganizationById,
        updateOrganization: updateOrganization,
        deleteOrganization: deleteOrganization
    };
    
    
};
    


module.exports = orgData;