/////////////////////////////////////////////////
// Jasmine spec (test suite) for Accounts APIs.
//
// @file:   accountApiSpec.js
// @author: Eric Brichetto <brichett13@gmail.com>
//          DukJin Ahn <ahnxx089@gmail.com>
/////////////////////////////////////////////////


/* jshint maxlen:1000 */


var request = require('request');
var apiBaseUrl = 'http://localhost:5000/api/accounts';
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJEExUVFja2dRL2hoZnZ4V1RUM3Z4bHV1WlEvRWVweUY1NzBlQnh4SDd4ZDNxT0NwbWpHU2JDIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxNi0wNS0xM1QwNjoxNjozNS4wMDBaIiwidXBkYXRlZERhdGUiOiIyMDE2LTA1LTEzVDA2OjE2OjM1LjAwMFoiLCJpYXQiOjE0NjM3Nzk3MDgsImV4cCI6MTQ5NTMxNTcwOH0.ZT9kcx1WiMxfsftVIxbvIn_1Mt5nYKAvl-duY7Vd7qM'; // token for "admin" user account, expires May 19, 2017
var baseRequest = request.defaults({
    headers: {
        'x-access-token': token
    }
});


describe('Accounts API', function () {

    it('is inaccessible without a valid token', function (done) {
        request.get(apiBaseUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                // Check the HTTP status code of response
                expect(res.statusCode).toBe(403);
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });
    it('getAccount returns all Accounts in system as an array', function (done) {
        baseRequest.get(apiBaseUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var typeofAccounts = Object.prototype.toString.call(JSON.parse(body));
                // Check whether the return value is an array
                expect(typeofAccounts).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });
    it('getAccount returns a valid Accounts entity', function (done) {
        baseRequest.get(apiBaseUrl + '/99', function (err, res, body) {
            expect(err).toBeNull();
            try {
                expect(JSON.parse(body).hasOwnProperty('partyId')).toBeTruthy();
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    //test times out, then throws error when it tries to continue after Jasmine has finished
    xit('addAccount adds an account and successfully returns the new entry\'s single partyId', function (done) {
        var newAccount = {
            partyTypeId: 'ORGANIZATION',
            preferredCurrencyUomId: 'USD',
            description: 'accountApi test',
            statusId: 'PARTY_DISABLED',
            createdBy: 'admin',
            orgName: 'Test Organization',
            officeSiteName: 'Test office',
            annualRevenue: '777',
            numEmployees: '777',
            tickerSymbol: 'test symbol',
            comments: 'test comment',
            logoImgURL: 'testlogourl.com',
            industryEnumId: 'IND_AEROSPACE',
            ownershipEnumId: 'OWN_SCORP',
            importantNote: 'test important note',
            emailAddress: 'test@testemail.com',
            webAddress: 'testwebsite.com',
            phoneNumber: '9990009999'
        };
        baseRequest.post(apiBaseUrl, {
            form: newAccount
        }, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                // Check whether return value is a partyId
                expect(result.hasOwnProperty('partyId')).toBeTruthy();
                // Check whether a single party id is returned
                expect(result.partyId.length).toBe(1);
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });


});