/////////////////////////////////////////////////
// Jasmine spec (test suite) for Party module.
//
// @file:   partySpec.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var knex = require('../src/config/knexConfig')().getConfig();
var partyController = require('../src/controllers/partyController')(knex);
var Party = require('../src/entities/party');

describe('Party module', function () {
    it('getParties returns all parties in system as an array of Party objects', function (done) {
        partyController.getParties()
            .then(function (parties) {
                // Get types of returned objects
                var typeofParties = Object.prototype.toString.call(parties);
                // Check whether the return value is an array
                expect(typeofParties).toBe('[object Array]');
                // Check whether the first element in returned array is of type Object
                expect(parties[0] instanceof Party).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('getParty returns a valid party entity', function (done) {
        partyController.getPartyById(2)
            .then(function (party) {
                expect(party instanceof Party).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
});