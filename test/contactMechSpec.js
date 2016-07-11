/////////////////////////////////////////////////
// Jasmine spec (test suite) for Contact module.
//
// @file:   contactMechSpec.js
// @author: William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint shadow:true */
/* jshint jasmine:true */
/* jshint maxlen:1000 */

var knex = require('../src/config/knexConfig')().getConfig();
var contactMechController = require('../src/controllers/contactMechController')(knex);
var ContactMech = require('../src/entities/contactMech');


describe('addContactMech', function () {
    it('returns array of errors for invalid input', function (done) {
        //var now = (new Date()).toISOString();
        var mech = {};

        var result = contactMechController.addContactMech(mech);

        var typeOfResult = Object.prototype.toString.call(result);
        expect(typeOfResult).toBe('[object Array]');
        done();
    });

    it('returns promise for valid email', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'EMAIL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_EMAIL',
            infoString: 'bob@gmail.com'
        };

        var result = contactMechController.addContactMech(mech);

        expect('then' in result).toBeTruthy();
        done();
    });

    it('returns promise for valid phone number', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'TELECOM_NUMBER',
            contactMechPurposeTypeId: 'PRIMARY_PHONE',
            contactNumber: '1-800-MoreNumbers'
        };

        var result = contactMechController.addContactMech(mech);

        expect('then' in result).toBeTruthy();
        done();
    });

    it('returns promise for valid postal address', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'POSTAL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_LOCATION',
            toName: 'test address'
        };

        var result = contactMechController.addContactMech(mech);

        expect('then' in result).toBeTruthy();
        done();
    });

    it('has number as fulfillment for email', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'EMAIL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_EMAIL',
            infoString: 'bob@gmail.com'
        };

        contactMechController.addContactMech(mech)
            .then(function (fulfillment) {
                expect(typeof fulfillment).toBe('number');
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });

    });

    it('has number as fulfillment for phone number', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'TELECOM_NUMBER',
            contactMechPurposeTypeId: 'PRIMARY_PHONE',
            contactNumber: '1-800-MoreNumbers'
        };

        contactMechController.addContactMech(mech)
            .then(function (fulfillment) {
                expect(typeof fulfillment).toBe('number');
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('has number as fulfillment for postal address', function (done) {
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'POSTAL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_LOCATION',
            toName: 'test address'
        };

        contactMechController.addContactMech(mech)
            .then(function (fulfillment) {
                expect(typeof fulfillment).toBe('number');
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
});

describe('getContactMechsByParty', function () {

});

describe('getContactMechById', function () {
    it('returns promise', function (done) {
        var mechId = 1;
        var result = contactMechController.getContactMechById(mechId);

        expect('then' in result).toBeTruthy();
        done();
    });

    it('has a contactMech entity as fulfillment', function (done) {
        var mechId = 1;
        var result = contactMechController.getContactMechById(mechId)
            .then(function (fulfillment) {
                expect(fulfillment instanceof ContactMech).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
});

describe('updateContactMech', function () {
    it('returns null for invalid input', function (done) {
        var id = 23;
        var mech = {};

        var result = contactMechController.updateContactMech(id, mech);

        expect(result).toBeNull();
        done();
    });
    
    it('returns a promise for valid input', function (done) {
        var id = 23;
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'EMAIL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_EMAIL',
            infoString: 'bob@gmail.com',
            createdDate: now
        };

        var result = contactMechController.updateContactMech(id, mech);

        expect('then' in result).toBeTruthy();
        done();
    });

    it('has a number as its fulfillment value', function (done) {
        var id = 23;
        var now = (new Date()).toISOString();
        var mech = {
            contactMechTypeId: 'EMAIL_ADDRESS',
            contactMechPurposeTypeId: 'PRIMARY_EMAIL',
            infoString: 'robbert@gmail.com',
            createdDate: now
        };

        contactMechController.updateContactMech(id, mech)
            .then(function (fulfillment) {
                expect(typeof fulfillment).toBe('number');
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
});

describe('linkContactMechToParty', function () {
    //TODO
});