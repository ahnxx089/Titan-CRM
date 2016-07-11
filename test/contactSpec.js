/////////////////////////////////////////////////
// Jasmine spec (test suite) for Contact module.
//
// @file:   contactSpec.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
//          William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint shadow:true */
/* jshint jasmine:true */
/* jshint maxlen:1000 */

var knex = require('../src/config/knexConfig')().getConfig();
var contactController = require('../src/controllers/contactController')(knex);
var userController = require('../src/controllers/userController')(knex);
var Contact = require('../src/entities/contact');

describe('Contact module ', function () {

    // Author:  Dinesh
    it('contactController.addContact allows a user with permission to add a Contact', function (done) {

        // user contactOwnerDEF has permission to create Contacts
        var user = {
            userId: 'contactOwnerDEF',
            password: '$2a$08$H/jGQdzkk1YrMJh92vtZH.sblwGrgnbOpKYhwxrHmdaFRe7h6E4/q',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 14,
            createdDate: '2016-05-25T16:11:12.000Z',
            updatedDate: '2016-05-25T16:11:12.000Z',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW'],
            iat: 1464484514,
            exp: 1464570914
        };
        var contact = {
            partyTypeId: 'PERSON',
            preferredCurrencyUomId: 'USD',
            description: 'addContact test',
            statusId: 'PARTY_ENABLED',
            createdBy: 'admin',
            salutation: 'Mr.',
            firstName: 'Pete',
            middleName: '',
            lastName: 'Davis',
            birthDate: '',
            comments: 'all four contact mechs coming in....',
            emailAddress: 'pete.davis@gmail.com',
            webAddress: 'www.snl.com',
            countryCode: '1',
            areaCode: '212',
            contactNumber: '123-4567',
            askForName: 'Petey',
            toName: 'Pete Davis',
            attnName: 'Pete Davis',
            address1: '1045 Maple Ave.',
            address2: '',
            directions: 'use Google maps',
            city: 'Ventura',
            stateProvinceGeoId: 'CA',
            zipOrPostalCode: '90210',
            countryGeoId: 'USA'
        };

        contactController.addContact(contact, user)
            .then(function (resultsForThisUser) {
                // Check whether the return value is an array
                expect(typeof resultsForThisUser).toBe('[object Array]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh
    it('contactController.getContactsByOwner allows a user with permission to own Contact(s) to get the party_id of Contacts owned by that user (if any)', function (done) {

        // user contactOwnerDEF has permission to own Contacts (but does not actually own any)
        var user = {
            userId: 'contactOwnerDEF',
            password: '$2a$08$H/jGQdzkk1YrMJh92vtZH.sblwGrgnbOpKYhwxrHmdaFRe7h6E4/q',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 14,
            createdDate: '2016-05-25T16:11:12.000Z',
            updatedDate: '2016-05-25T16:11:12.000Z',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW'],
            iat: 1464484514,
            exp: 1464570914
        };

        // when a user has Contact owner rights, the controller returns an object.  The object will
        // be empty if the user does not actually own any contacts, but the facts that user had 
        // permission to create (and therefore own) contacts is what is being tested here.
        var resultsForThisUser = contactController.getContactsByOwner(user);

        resultsForThisUser
            .then(function (contacts) {
                var typeOfContacts = Object.prototype.toString.call(contacts);
                // Check whether the return value is an array
                expect(typeOfContacts).toBe('[object Array]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh
    it('contactController.getContactsByOwner allows a user with permission to own Contact(s) to get the party_id of Contacts owned by that user', function (done) {

        // user contactOwnerDEF has permission to own Contacts (and owns at least one)
        var user = {
            userId: 'contactOwnerABC',
            password: '$2a$08$iTaPqQ/4W8LSDNBDT18opegvSxo4kWC8SjWNojHP/lhN7eOSTYHJu',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 13,
            createdDate: '2016-05-25T16:07:11.000Z',
            updatedDate: '2016-05-25T16:07:11.000Z',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW'],
            iat: 1464484484,
            exp: 1464570884
        };

        // when a user has Contact owner rights, the controller returns an object.
        var resultsForThisUser = contactController.getContactsByOwner(user);

        // The controller returns a promise, therefore the expect() and done() must be put in a 
        // .then() clause so that the promise can be fulfilled. Otherwise the adding of the Contact
        // does not actually happen before the expect() is reached and the done() executes.
        resultsForThisUser
            .then(function (contact) {
                // Get types of returned objects
                var typeofContact = Object.prototype.toString.call(contact);
                // Check whether the return value is an array
                expect(typeofContact).toBe('[object Array]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh
    it('contactController.getContactsByOwner DENIES a user without permission to own Contact(s) to get the party_id of (any) Contacts', function (done) {
        // leadOwnerDEF has permission to own Leads, but not Contacts
        var user = {
            userId: 'leadOwnerDEF',
            password: '$2a$08$Y/fQPgblCV2ZK6UtopnyveZpn.VoY1ZP4oPK6R3JOuzTi9FU42Hiu',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 18,
            createdDate: '2016-05-28T03:34:11.000Z',
            updatedDate: '2016-05-28T03:34:11.000Z',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_LEAD_DEACTIVATE', 'CRMSFA_LEAD_DELETE', 'CRMSFA_LEAD_REASSIGN', 'CRMSFA_LEAD_UPDATE', 'CRMSFA_LEAD_VIEW', 'CRMSFA_OPP_CREATE', 'CRMSFA_OPP_UPDATE', 'CRMSFA_OPP_VIEW'],
            iat: 1464484584,
            exp: 1464570984
        };

        var resultsForThisUser = contactController.getContactsByOwner(user);

        // handle as in the Api layer, with an IF ELSE block to interpret whether the output
        // is a promise or is null (cannot use .then on a null)
        if (resultsForThisUser === null) {
            expect(resultsForThisUser === null).toBeTruthy();
            // Call done to finish the async function
            done();
        } else {
            var typeOfContacts = Object.prototype.toString.call(resultsForThisUser);
            // Check whether the return value is an array
            expect(typeOfContacts).toBe('[object Array]');
            // Call done to finish the async function
            done();
        }
    });

    // Author:  Dinesh
    it('contactController.getContactsByIdentity allows a user with permission to own Contact(s) to get the party_id of Contacts owned by that user (if any)', function (done) {

        // this search looks for any first name containing "w" AND last name containing "e"
        var query = {
            firstName: 'w',
            lastName: 'e'
        };
        var user = {
            userId: 'crmsfaContactTasksABC',
            password: '$2a$08$CB.AAzCvAM7ghsIgD9HurePO3BsLDAJ0tBGIPHLhv9ijyay1E24O2',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 15,
            createdDate: '2016-05-25T16:14:33.000Z',
            updatedDate: '2016-05-25T16:14:33.000Z',
            securityPermissions: ['CRMSFA_ACTS_VIEW', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACTS_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW', 'CRMSFA_VIEW', 'PARTYMGR_CME_CREATE', 'PARTYMGR_CME_DELETE', 'PARTYMGR_CME_UPDATE', 'PARTYMGR_GRP_UPDATE', 'PARTYMGR_NOTE', 'PARTYMGR_PCM_CREATE', 'PARTYMGR_PCM_DELETE', 'PARTYMGR_PCM_UPDATE', 'PARTYMGR_REL_CREATE', 'PARTYMGR_REL_UPDATE', 'PARTYMGR_ROLE_CREATE', 'PARTYMGR_ROLE_DELETE', 'PARTYMGR_SRC_CREATE', 'PARTYMGR_STS_UPDATE', 'WORKEFFORTMGR_ADMIN'],
            iat: 1464484540,
            exp: 1464570940
        };

        var resultsForUser = contactController.getContactsByIdentity(query, user);
        resultsForUser
            .then(function (contacts) {
                var typeOfContacts = Object.prototype.toString.call(contacts);
                // Check whether the return value is an array
                expect(typeOfContacts).toBe('[object Array]');
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('getContactById returns a valid contact entity', function (done) {
        user = {securityPermissions: ['CRMSFA_CONTACT_VIEW']};
        contactController.getContactById(56, user)
            .then(function (contact) {
                expect(contact).toBeTruthy();
                expect(contact instanceof Contact).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

});

describe('updateContact', function () {
    it('returns null if user lacks permission', function (done) {
        var contactId = 20;
        var user = {
            securityPermissions: []
        };
        var contact = {};
        var output = contactController.updateContact(contactId, contact, user);
        expect(output).toBeNull();
        done();
    });

    it('returns error array for bad data', function (done) {
        var contactId = 20;
        var user = {
            securityPermissions: ['CRMSFA_CONTACT_UPDATE']
        };
        var contact = {};
        var output = contactController.updateContact(contactId, contact, user);
        var outputType = Object.prototype.toString.call(output);
        expect(outputType).toBe('[object Array]');
        done();
    });

    it('does not return null for valid input', function (done) {
        var now = (new Date()).toISOString();
        var contactId = 20;
        var user = {
            securityPermissions: ['CRMSFA_CONTACT_UPDATE']
        };

        //wanted to use getContact, but couldn't get it to work
        var contact = new Contact(
            contactId,
            'PERSON',
            'USD',
            'blah',
            'PARTY_ENABLED',
            'fullAdminABC',
            now,
            now,
            'Mr.',
            'Agent',
            'Francis',
            'Smith',
            now,
            'nondescript'
        );

        var output = contactController.updateContact(contactId, contact, user);
        expect(output).not.toBeNull();
        done();

    });

    it('returns promise for valid input', function (done) {
        var now = (new Date()).toISOString();
        var contactId = 20;
        var user = {
            securityPermissions: ['CRMSFA_CONTACT_UPDATE']
        };

        //wanted to use getContact, but couldn't get it to work
        var contact = new Contact(
            contactId,
            'PERSON',
            'USD',
            'blah',
            'PARTY_ENABLED',
            'fullAdminABC',
            now,
            now,
            'Mr.',
            'Agent',
            'Francis',
            'Smith',
            now,
            'nondescript'
        );

        var output = contactController.updateContact(contactId, contact, user);
        expect('then' in output).toBeTruthy();
        done();

    });

    //need to test values changed in database
    //but can't get getContact to work

});