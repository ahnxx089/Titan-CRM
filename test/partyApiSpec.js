//////////////////////////////////////////////////
// Jasmine spec (test suite) for Party APIs.
//
// @file:   partyApiSpec.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////


var request = require('request');
var apiBaseUrl = 'http://localhost:5000/api/parties';

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJEExUVFja2dRL2hoZnZ4V1RUM3Z4bHV1WlEvRWVweUY1NzBlQnh4SDd4ZDNxT0NwbWpHU2JDIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxNi0wNS0xM1QwNjoxNjozNS4wMDBaIiwidXBkYXRlZERhdGUiOiIyMDE2LTA1LTEzVDA2OjE2OjM1LjAwMFoiLCJzZWN1cml0eVBlcm1pc3Npb25zIjpbIkNSTVNGQV9BQ1RfQURNSU4iLCJDUk1TRkFfQUNUX0NMT1NFIiwiQ1JNU0ZBX0FDVF9DUkVBVEUiLCJDUk1TRkFfQUNUX1VQREFURSIsIkNSTVNGQV9BQ1RfVklFVyIsIkNSTVNGQV9DT05UQUNUX0NSRUFURSIsIkNSTVNGQV9DT05UQUNUX0RFQUNUSVZBVEUiLCJDUk1TRkFfQ09OVEFDVF9SRUFTU0lHTiIsIkNSTVNGQV9DT05UQUNUX1VQREFURSIsIkNSTVNGQV9DT05UQUNUX1ZJRVciLCJBQ0NPVU5USU5HX0FETUlOIiwiQUNDT1VOVElOR19DT01NX1ZJRVciLCJBQ0NPVU5USU5HX1BSSU5UX0NIRUNLUyIsIkFDQ1RHX0FUWF9BRE1JTiIsIkFDQ1RHX0ZYX1VQREFURSIsIkFDQ1RHX1BSRUZfQURNSU4iLCJBUlRJRkFDVF9JTkZPX1ZJRVciLCJBU1NFVE1BSU5UX0FETUlOIiwiQ0FUQUxPR19BRE1JTiIsIkNBVEFMT0dfUFJJQ0VfTUFJTlQiLCJDQVRBTE9HX1BVUkNIQVNFX0FMTE9XIiwiQ0FUQUxPR19WSUVXX0FMTE9XIiwiQ09NTU9OX0FETUlOIiwiQ09OVEVOVE1HUl9BRE1JTiIsIkRBVEFGSUxFX01BSU5UIiwiRUJBWV9WSUVXIiwiRU5USVRZX0RBVEFfQURNSU4iLCJFTlRJVFlfTUFJTlQiLCJFTlRJVFlfU1lOQ19BRE1JTiIsIkVOVU1fU1RBVFVTX01BSU5UIiwiRVhBTVBMRV9BRE1JTiIsIkZBQ0lMSVRZX0FETUlOIiwiR09PR0xFQkFTRV9WSUVXIiwiTEFCRUxfTUFOQUdFUl9WSUVXIiwiTUFOVUFMX1BBWU1FTlQiLCJNQU5VRkFDVFVSSU5HX0FETUlOIiwiTUFSS0VUSU5HX0FETUlOIiwiT0FHSVNfVklFVyIsIk9GQlRPT0xTX1ZJRVciLCJPUkRFUk1HUl9BRE1JTiIsIlBBUlRZTUdSX0FETUlOIiwiUEFZUFJPQ19BRE1JTiIsIlBBWV9JTkZPX0FETUlOIiwiUEVSSU9EX01BSU5UIiwiUFJPSkVDVE1HUl9BRE1JTiIsIlNFQ1VSSVRZX0FETUlOIiwiU0VORF9DT05UUk9MX0FQUExFVCIsIlNFUlZFUl9TVEFUU19WSUVXIiwiU0VSVklDRV9JTlZPS0VfQU5ZIiwiU0VSVklDRV9NQUlOVCIsIlNISVBSQVRFX0FETUlOIiwiVEVNUEVYUFJfQURNSU4iLCJVU0VSUFJFRl9BRE1JTiIsIlVUSUxfQ0FDSEVfRURJVCIsIlVUSUxfQ0FDSEVfVklFVyIsIlVUSUxfREVCVUdfRURJVCIsIlVUSUxfREVCVUdfVklFVyIsIlZJU1VBTFRIRU1FX0FETUlOIiwiV0VCVE9PTFNfVklFVyIsIldPUktFRkZPUlRNR1JfQURNSU4iXSwiaWF0IjoxNDY0NTcxOTMyLCJleHAiOjE0NjQ2NTgzMzJ9.tj5XMmgK13TQwZibfOEPjXtD0sMo5ts-kbeGsN1hi_E'; // token for "admin" user account, generated 2016 May 29
var baseRequest = request.defaults({
    headers: {
        'x-access-token': token
    }
});

describe('Party API', function () {

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

    it('getParties returns all parties in system as an array', function (done) {
        baseRequest.get(apiBaseUrl, function (err, res, body) {

            expect(err).toBeNull();
            try {
                var typeofParties = Object.prototype.toString.call(JSON.parse(body));
                // Check whether the return value is an array
                expect(typeofParties).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    it('getParty returns a valid party entity', function (done) {
        baseRequest.get(apiBaseUrl + '/2', function (err, res, body) {

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

    it('addParty adds a party and returns a single party id', function (done) {
        var newParty = {
            partyTypeId: 'PERSON',
            preferredCurrencyUomId: 'USD',
            description: '',
            statusId: 'PARTY_ENABLED'
        };
        baseRequest.post(apiBaseUrl, {
            form: newParty
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