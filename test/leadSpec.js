/////////////////////////////////////////////////
// Jasmine spec (test suite) for Lead module.
//
// @file:   leadSpec.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////



var knex = require('../src/config/knexConfig')().getConfig();
var leadController = require('../src/controllers/leadController')(knex);
var Lead = require('../src/entities/lead');

// Author: Xiaosiqi
describe('Lead module', function () {

    // Author: Xiaosiqi
    // this is same as the second 
    it('getLeads returns all leads in system as an array of Lead objects', function (done) {
        leadController.getLeadById(120)
            .then(function (leads) {
                // Get types of returned objects
                var typeofLeads = Object.prototype.toString.call(leads);
                // Check whether the return value is an array
                expect(typeofLeads).toBe('[object Object]');
                // Check whether the first element in returned array is of type Object
                expect(leads instanceof Lead).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('getLead returns a valid lead entity', function (done) {
        leadController.getLeadById(2)
            .then(function (lead) {
                expect(lead instanceof Lead).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });


    // Author: Xiaosiqi
    // Test leadController.addLead where a user has security permission to add a lead
    it('leadController.addLead allows a user with permission to add a Lead', function (done) {

        // user leadOwnerABC has permission to create leads
        var user = {
            userId: 'leadOwnerABC',
            password: '$2a$08$5RdFI2AF2Qwl5UHpBqy0Ve67wHhMB4ctOyPpaDMe8Yw/CZA66TutW',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 17,
            createdDate: '2016-05-25 13:14:31',
            updatedDate: '2016-05-25 13:14:31',
            securityPermissions: ['CRMSFA_LEAD_CREATE', 'CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_LEAD_DEACTIVATE', 'CRMSFA_LEAD_DELETE', 'CRMSFA_LEAD_REASSIGN', 'CRMSFA_LEAD_UPDATE', 'CRMSFA_LEAD_VIEW', 'CRMSFA_OPP_CREATE', 'CRMSFA_OPP_UPDATE', 'CRMSFA_OPP_VIEW'],
            iat: 1464484514,
            exp: 1464570914
        };
        var lead = {
            "partyTypeId": "PERSON",
            "currencyUomId": "USD",
            "description": "I am a woman",
            "statusId": "PARTY_ENABLED",

            "salutation": "Dear Ms.",
            "firstName": "Marilyn",
            "middleName": "Monroe",
            "lastName": "Kennedy",
            "comments": "famous actress",

            "parentPartyId": 120,
            "companyName": "Hollywood",
            "annualRevenue": 1000000,
            "numEmployees": 1000,

            "industryEnumId": "IND_MEDIA",
            "ownershipEnumId": "OWN_CCORP",
            "tickerSymbol": "this is a ticker",
            "importantNote": "this is an important notes",

            "roleTypeId": "this's lead anyway",

            "emailAddress": "marilyn.monroe<3president@yahoo.com",
            "webAddress": "marilyn.kennedy.com"
        };

        var resultsForThisUser = leadController.addLead(lead, user);
        // The controller returns a promise, therefore the expect() and done() must be put in a 
        // .then() clause so that the promise can be fulfilled. Otherwise the adding of the Lead
        // does not actually happen before the expect() is reached and the done() executes.
        resultsForThisUser
            .then(function (lead) {
                // Get types of returned objects
                var typeofLead = Object.prototype.toString.call(lead);
                // Check whether the return value is an array
                expect(typeofLead).toBe('[object Number]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author: Xiaosiqi
    // Test leadController.getLeadsByOwner where a user has security permission
    // (but does not actually own any leads) -- TEST HAS not PASSED
    it('leadController.getLeadsByOwner allows a user with permission to own Lead(s) to get the party_id of Lead owned by that user (if any)', function (done) {

        // user leadOwnerABC has permission to own Leads, ignore:(but does not actually own any)
        var user = {
            userId: 'leadOwnerABC',
            password: '$2a$08$5RdFI2AF2Qwl5UHpBqy0Ve67wHhMB4ctOyPpaDMe8Yw/CZA66TutW',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 17,
            createdDate: '2016-05-25 13:14:31',
            updatedDate: '2016-05-25 13:14:31',
            securityPermissions: ['CRMSFA_LEAD_CREATE', 'CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_LEAD_DEACTIVATE', 'CRMSFA_LEAD_DELETE', 'CRMSFA_LEAD_REASSIGN', 'CRMSFA_LEAD_UPDATE', 'CRMSFA_LEAD_VIEW', 'CRMSFA_OPP_CREATE', 'CRMSFA_OPP_UPDATE', 'CRMSFA_OPP_VIEW']
        };

        // when a user has Lead owner rights, the controller returns an object. The object will
        // be empty if the user does not actually own any leads, but the facts that user had 
        // permission to create (and therefore own) leads is what is being tested here.
        var resultsForThisUser = leadController.getLeadsByOwner(user);

        resultsForThisUser
            .then(function (leads) {
                var typeOfLeads = Object.prototype.toString.call(leads);
                // Check whether the return value is an array
                expect(typeOfLeads).toBe('[object Array]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

});