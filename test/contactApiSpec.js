/////////////////////////////////////////////////
// Jasmine spec (test suite) for Contact APIs.
//
// @file:   contactApiSpec.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
//           William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint maxlen:1000 */
var request = require('request');
var apiBaseUrl = 'http://localhost:5000/api/contacts';

describe('Contact API', function () {

    it('is inaccessible without a valid token', function (done) {

        var token = 'iAmNotAValidToken';
        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token
            }
        });

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

    // Author:  Dinesh
    it('addContacts adds a contact and returns a single party id', function (done) {

        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJEExUVFja2dRL2hoZnZ4V1RUM3Z4bHV1WlEvRWVweUY1NzBlQnh4SDd4ZDNxT0NwbWpHU2JDIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxNi0wNS0xM1QwNjoxNjozNS4wMDBaIiwidXBkYXRlZERhdGUiOiIyMDE2LTA1LTEzVDA2OjE2OjM1LjAwMFoiLCJzZWN1cml0eVBlcm1pc3Npb25zIjpbIkNSTVNGQV9BQ1RfQURNSU4iLCJDUk1TRkFfQUNUX0NMT1NFIiwiQ1JNU0ZBX0FDVF9DUkVBVEUiLCJDUk1TRkFfQUNUX1VQREFURSIsIkNSTVNGQV9BQ1RfVklFVyIsIkNSTVNGQV9DT05UQUNUX0NSRUFURSIsIkNSTVNGQV9DT05UQUNUX0RFQUNUSVZBVEUiLCJDUk1TRkFfQ09OVEFDVF9SRUFTU0lHTiIsIkNSTVNGQV9DT05UQUNUX1VQREFURSIsIkNSTVNGQV9DT05UQUNUX1ZJRVciLCJBQ0NPVU5USU5HX0FETUlOIiwiQUNDT1VOVElOR19DT01NX1ZJRVciLCJBQ0NPVU5USU5HX1BSSU5UX0NIRUNLUyIsIkFDQ1RHX0FUWF9BRE1JTiIsIkFDQ1RHX0ZYX1VQREFURSIsIkFDQ1RHX1BSRUZfQURNSU4iLCJBUlRJRkFDVF9JTkZPX1ZJRVciLCJBU1NFVE1BSU5UX0FETUlOIiwiQ0FUQUxPR19BRE1JTiIsIkNBVEFMT0dfUFJJQ0VfTUFJTlQiLCJDQVRBTE9HX1BVUkNIQVNFX0FMTE9XIiwiQ0FUQUxPR19WSUVXX0FMTE9XIiwiQ09NTU9OX0FETUlOIiwiQ09OVEVOVE1HUl9BRE1JTiIsIkRBVEFGSUxFX01BSU5UIiwiRUJBWV9WSUVXIiwiRU5USVRZX0RBVEFfQURNSU4iLCJFTlRJVFlfTUFJTlQiLCJFTlRJVFlfU1lOQ19BRE1JTiIsIkVOVU1fU1RBVFVTX01BSU5UIiwiRVhBTVBMRV9BRE1JTiIsIkZBQ0lMSVRZX0FETUlOIiwiR09PR0xFQkFTRV9WSUVXIiwiTEFCRUxfTUFOQUdFUl9WSUVXIiwiTUFOVUFMX1BBWU1FTlQiLCJNQU5VRkFDVFVSSU5HX0FETUlOIiwiTUFSS0VUSU5HX0FETUlOIiwiT0FHSVNfVklFVyIsIk9GQlRPT0xTX1ZJRVciLCJPUkRFUk1HUl9BRE1JTiIsIlBBUlRZTUdSX0FETUlOIiwiUEFZUFJPQ19BRE1JTiIsIlBBWV9JTkZPX0FETUlOIiwiUEVSSU9EX01BSU5UIiwiUFJPSkVDVE1HUl9BRE1JTiIsIlNFQ1VSSVRZX0FETUlOIiwiU0VORF9DT05UUk9MX0FQUExFVCIsIlNFUlZFUl9TVEFUU19WSUVXIiwiU0VSVklDRV9JTlZPS0VfQU5ZIiwiU0VSVklDRV9NQUlOVCIsIlNISVBSQVRFX0FETUlOIiwiVEVNUEVYUFJfQURNSU4iLCJVU0VSUFJFRl9BRE1JTiIsIlVUSUxfQ0FDSEVfRURJVCIsIlVUSUxfQ0FDSEVfVklFVyIsIlVUSUxfREVCVUdfRURJVCIsIlVUSUxfREVCVUdfVklFVyIsIlZJU1VBTFRIRU1FX0FETUlOIiwiV0VCVE9PTFNfVklFVyIsIldPUktFRkZPUlRNR1JfQURNSU4iXSwiaWF0IjoxNDY0Njk1NzQyLCJleHAiOjE0NjQ3ODIxNDJ9.Dlqy7Dpmex63G8vA3GXmqbRJRnqqdzFlDC7vTOxMDS8';
        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token
            }
        });

        var newContact = {
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

        baseRequest.post(apiBaseUrl, {
            form: newContact
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

    // Author:  Dinesh
    it('getContactsByOwner returns all contacts owned by a user as an array', function (done) {

        // token and baseRequest request declarations for user admin
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb250YWN0T3duZXJBQkMiLCJwYXNzd29yZCI6IiQyYSQwOCRpVGFQcVEvNFc4TFNETkJEVDE4b3BlZ3ZTeG80a1dDOFNqV05vakhQL2xoTjdlT1NUWUhKdSIsInBhc3N3b3JkSGludCI6bnVsbCwiZW5hYmxlZCI6MSwiZGlzYWJsZWREYXRlIjpudWxsLCJwYXJ0eUlkIjoxMywiY3JlYXRlZERhdGUiOiIyMDE2LTA1LTI1VDE2OjA3OjExLjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDUtMjVUMTY6MDc6MTEuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX0FDVF9BRE1JTiIsIkNSTVNGQV9BQ1RfQ0xPU0UiLCJDUk1TRkFfQUNUX0NSRUFURSIsIkNSTVNGQV9BQ1RfVVBEQVRFIiwiQ1JNU0ZBX0FDVF9WSUVXIiwiQ1JNU0ZBX0NPTlRBQ1RfQ1JFQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfREVBQ1RJVkFURSIsIkNSTVNGQV9DT05UQUNUX1JFQVNTSUdOIiwiQ1JNU0ZBX0NPTlRBQ1RfVVBEQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfVklFVyIsIkNSTVNGQV9DQVNFX0NSRUFURSIsIkNSTVNGQV9BQ1RTX1ZJRVciLCJDUk1TRkFfQUNUX0NMT1NFIiwiQ1JNU0ZBX0FDVF9DUkVBVEUiLCJDUk1TRkFfQUNUX1VQREFURSIsIkNSTVNGQV9BQ1RfVklFVyIsIkNSTVNGQV9DT05UQUNUU19WSUVXIiwiQ1JNU0ZBX0NPTlRBQ1RfQ1JFQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfREVBQ1RJVkFURSIsIkNSTVNGQV9DT05UQUNUX1JFQVNTSUdOIiwiQ1JNU0ZBX0NPTlRBQ1RfVVBEQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfVklFVyIsIkNSTVNGQV9WSUVXIiwiUEFSVFlNR1JfQ01FX0NSRUFURSIsIlBBUlRZTUdSX0NNRV9ERUxFVEUiLCJQQVJUWU1HUl9DTUVfVVBEQVRFIiwiUEFSVFlNR1JfR1JQX1VQREFURSIsIlBBUlRZTUdSX05PVEUiLCJQQVJUWU1HUl9QQ01fQ1JFQVRFIiwiUEFSVFlNR1JfUENNX0RFTEVURSIsIlBBUlRZTUdSX1BDTV9VUERBVEUiLCJQQVJUWU1HUl9SRUxfQ1JFQVRFIiwiUEFSVFlNR1JfUkVMX1VQREFURSIsIlBBUlRZTUdSX1JPTEVfQ1JFQVRFIiwiUEFSVFlNR1JfUk9MRV9ERUxFVEUiLCJQQVJUWU1HUl9TUkNfQ1JFQVRFIiwiUEFSVFlNR1JfU1RTX1VQREFURSIsIldPUktFRkZPUlRNR1JfQURNSU4iXSwiaWF0IjoxNDY1NjYwMzk4LCJleHAiOjE0OTcxOTYzOTh9.IJjTeVEPIzAzOJPndDi9YTeFR_3eSR1AEA8Slf8kzHQ';
        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token
            }
        });

        baseRequest.get(apiBaseUrl, function (err, res, body) {

            expect(err).toBeNull();
            try {
                var typeofContacts = Object.prototype.toString.call(JSON.parse(body));
                // Check whether the return value is an array
                expect(typeofContacts).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    // Author:  Dinesh
    it('getContactsByIdentity returns found contacts as an array', function (done) {

        // token and baseRequest request declarations for user admin
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJEExUVFja2dRL2hoZnZ4V1RUM3Z4bHV1WlEvRWVweUY1NzBlQnh4SDd4ZDNxT0NwbWpHU2JDIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjIsImNyZWF0ZWREYXRlIjoiMjAxNi0wNS0xM1QwNjoxNjozNS4wMDBaIiwidXBkYXRlZERhdGUiOiIyMDE2LTA1LTEzVDA2OjE2OjM1LjAwMFoiLCJzZWN1cml0eVBlcm1pc3Npb25zIjpbIkNSTVNGQV9BQ1RfQURNSU4iLCJDUk1TRkFfQUNUX0NMT1NFIiwiQ1JNU0ZBX0FDVF9DUkVBVEUiLCJDUk1TRkFfQUNUX1VQREFURSIsIkNSTVNGQV9BQ1RfVklFVyIsIkNSTVNGQV9DT05UQUNUX0NSRUFURSIsIkNSTVNGQV9DT05UQUNUX0RFQUNUSVZBVEUiLCJDUk1TRkFfQ09OVEFDVF9SRUFTU0lHTiIsIkNSTVNGQV9DT05UQUNUX1VQREFURSIsIkNSTVNGQV9DT05UQUNUX1ZJRVciLCJBQ0NPVU5USU5HX0FETUlOIiwiQUNDT1VOVElOR19DT01NX1ZJRVciLCJBQ0NPVU5USU5HX1BSSU5UX0NIRUNLUyIsIkFDQ1RHX0FUWF9BRE1JTiIsIkFDQ1RHX0ZYX1VQREFURSIsIkFDQ1RHX1BSRUZfQURNSU4iLCJBUlRJRkFDVF9JTkZPX1ZJRVciLCJBU1NFVE1BSU5UX0FETUlOIiwiQ0FUQUxPR19BRE1JTiIsIkNBVEFMT0dfUFJJQ0VfTUFJTlQiLCJDQVRBTE9HX1BVUkNIQVNFX0FMTE9XIiwiQ0FUQUxPR19WSUVXX0FMTE9XIiwiQ09NTU9OX0FETUlOIiwiQ09OVEVOVE1HUl9BRE1JTiIsIkRBVEFGSUxFX01BSU5UIiwiRUJBWV9WSUVXIiwiRU5USVRZX0RBVEFfQURNSU4iLCJFTlRJVFlfTUFJTlQiLCJFTlRJVFlfU1lOQ19BRE1JTiIsIkVOVU1fU1RBVFVTX01BSU5UIiwiRVhBTVBMRV9BRE1JTiIsIkZBQ0lMSVRZX0FETUlOIiwiR09PR0xFQkFTRV9WSUVXIiwiTEFCRUxfTUFOQUdFUl9WSUVXIiwiTUFOVUFMX1BBWU1FTlQiLCJNQU5VRkFDVFVSSU5HX0FETUlOIiwiTUFSS0VUSU5HX0FETUlOIiwiT0FHSVNfVklFVyIsIk9GQlRPT0xTX1ZJRVciLCJPUkRFUk1HUl9BRE1JTiIsIlBBUlRZTUdSX0FETUlOIiwiUEFZUFJPQ19BRE1JTiIsIlBBWV9JTkZPX0FETUlOIiwiUEVSSU9EX01BSU5UIiwiUFJPSkVDVE1HUl9BRE1JTiIsIlNFQ1VSSVRZX0FETUlOIiwiU0VORF9DT05UUk9MX0FQUExFVCIsIlNFUlZFUl9TVEFUU19WSUVXIiwiU0VSVklDRV9JTlZPS0VfQU5ZIiwiU0VSVklDRV9NQUlOVCIsIlNISVBSQVRFX0FETUlOIiwiVEVNUEVYUFJfQURNSU4iLCJVU0VSUFJFRl9BRE1JTiIsIlVUSUxfQ0FDSEVfRURJVCIsIlVUSUxfQ0FDSEVfVklFVyIsIlVUSUxfREVCVUdfRURJVCIsIlVUSUxfREVCVUdfVklFVyIsIlZJU1VBTFRIRU1FX0FETUlOIiwiV0VCVE9PTFNfVklFVyIsIldPUktFRkZPUlRNR1JfQURNSU4iXSwiaWF0IjoxNDY0Njk1NzQyLCJleHAiOjE0NjQ3ODIxNDJ9.Dlqy7Dpmex63G8vA3GXmqbRJRnqqdzFlDC7vTOxMDS8';
        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token
            }
        });

        baseRequest.get(apiBaseUrl + '?firstName=w&lastName=e', function (err, res, body) {
            expect(err).toBeNull();
            try {
                var typeofContacts = Object.prototype.toString.call(JSON.parse(body));
                // Check whether the return value is an array
                expect(typeofContacts).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

});

describe('updateContact', function () {
    it('returns number of rows updated', function (done) {
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb250YWN0T3duZXJBQkMiLCJwYXNzd29yZCI6IiQyYSQwOCRpVGFQcVEvNFc4TFNETkJEVDE4b3BlZ3ZTeG80a1dDOFNqV05vakhQL2xoTjdlT1NUWUhKdSIsInBhc3N3b3JkSGludCI6bnVsbCwiZW5hYmxlZCI6MSwiZGlzYWJsZWREYXRlIjpudWxsLCJwYXJ0eUlkIjoxMywiY3JlYXRlZERhdGUiOiIyMDE2LTA1LTI1VDE2OjA3OjExLjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDUtMjVUMTY6MDc6MTEuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX0FDVF9BRE1JTiIsIkNSTVNGQV9BQ1RfQ0xPU0UiLCJDUk1TRkFfQUNUX0NSRUFURSIsIkNSTVNGQV9BQ1RfVVBEQVRFIiwiQ1JNU0ZBX0FDVF9WSUVXIiwiQ1JNU0ZBX0NPTlRBQ1RfQ1JFQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfREVBQ1RJVkFURSIsIkNSTVNGQV9DT05UQUNUX1JFQVNTSUdOIiwiQ1JNU0ZBX0NPTlRBQ1RfVVBEQVRFIiwiQ1JNU0ZBX0NPTlRBQ1RfVklFVyIsIkNSTVNGQV9DQVNFX0NSRUFURSJdLCJpYXQiOjE0NjUzNDMyNTQsImV4cCI6MTQ5Njg3OTI1NH0.xFe4WLekfCQgv1AHWW_rvSNodenolKatIEazC4Xg85c';
        //token should be good through May 2017

        var id = 20;
        var now = (new Date()).toISOString();
        var contact = {
            partyId: id,
            partyTypeId: 'PERSON',
            currencyUomId: 'USD',
            description: 'blah',
            statusId: 'PARTY_ENABLED',
            createdBy: 'fullAdminABC',
            createdDate: now,
            updatedDate: now,
            salutation: 'Mr.',
            firstName: 'Agent',
            middleName: 'Francis',
            lastName: 'Smith',
            birthDate: now,
            comments: 'nondescript'
        };

        var baseRequest = request.defaults({
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(contact)
        });

        baseRequest.put(apiBaseUrl + '/' + id, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect('rowsUpdated' in result).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });
});