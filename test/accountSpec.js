/////////////////////////////////////////////////
// Jasmine spec (test suite) for Accounts APIs.
//
// @file:   accountSpec.js
// @author: Eric Brichetto <brichett13@gmail.com>
//          DukJin Ahn <ahnxx089@gmail.com>
/////////////////////////////////////////////////

/* jshint maxlen:1000 */


var knex = require('../src/config/knexConfig')().getConfig();
var accountController = require('../src/controllers/accountController')(knex);
var Account = require('../src/entities/account');


describe('Account module', function () {

    it('getAccounts returns a valid account entity', function (done) {
        accountController.getAccountById(70)
            .then(function (account) {
                expect(account instanceof Account).toBeTruthy();
                // Call done to finish the async function
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
    it('getAccountsByOwner returns a valid array of accounts', function (done) {
        user = {
            partyId: 2,
            securityPermissions: ['CRMSFA_ACT_CREATE']
        }
        
        accountController.getAccountsByOwner(user)
            .then(function (accounts) {
                //The thing I'm still uncertain of here is whether anything needs 
                //to be tested regarding the ownerId/userId. It's redundant to 
                //check whether the userId being used actually exists in the database...
                //because if it didn't, the user would be able to access most of the API or
                //run unit tests in the first place. And the final product will
                //be getting the ownerId automatically from the API calls' HTTP headers,
                //where there isn't much or any wiggle room to manually send a user token that's different from 
                //the one currently enabled for the user. Hmm...
                var typeofAccounts = Object.prototype.toString.call(accounts);
                //Next, check whether the result of getAccountsByOwner is a valid array
                expect(typeofAccounts).toBe('[object Array]');
                //Next, check whether the objects in that array are of type Account
                expect(accounts[0] instanceof Account).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
    it('accountController.getAccountByIdentity get the query of account name if the accountId owned', function (done) {

        // Searchcing looks for any 
        var query = {
            accountId: 'Company',
            accountName: 'apple'
        };

        var user = {
            userId: 'accountIdentityABC',
            password: '$2a$08$C/#Q5zk21&42UP28utHY/utlwCZP6b6pUOgxqzJIopjWE4t5q2p1',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 11,
            createdDate: '2016-05-30T14:12:40',
            updatedDate: '2016-05-30T14:12:40',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW'],

        };
        var resultsForThisTest =
            accountController.getAccountByIdentity(query, user);

        resultsForThisTest
            .then(function (accounts) {
                var typeofAccounts = Object.prototype.toString.call(accounts);
                // Check whether the return value is accounts array
                expect(typeofAccounts).toBe('[object Array]');
                // finsh
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });
    it('accountController.getAccountByPhoneNumber get the query of account phoneNumber', function (done) {

        // Searchcing looks for any 
        var query = {
            phoneNumber: '123456789'
        };

        var user = {
            userId: 'accountPhoneNumberABC',
            password: '$2a$08$GeQ55k^12*rqP2XZu24<15l3aWQ6w6uOPOZwqPIIN/2311arhGP',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 14,
            createdDate: '2016-05-30T14:18:30',
            updatedDate: '2016-05-30T14:18:30',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW'],

        };
        var resultsForThisTest =
            accountController.getAccountByPhoneNumber(query, user);

        resultsForThisTest
            .then(function (accounts) {
                var typeofAccounts = Object.prototype.toString.call(accounts);
                // Check whether the return value is accounts array
                expect(typeofAccounts).toBe('[object Array]');
                // finsh
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('accountController.update account put the query', function (done) {
        var accountId = 'Company';
        var accounts = {};
        var resultsForThisTest = accountController.updateAccount(accountId, accounts);
        expect(resultsForThisTest).toBeTruthy();
        done();
    });
    
    it('accountController.delete account delete the query', function (done) {
        var accountId = 'Company2';
        var resultsForThisTest = accountController.deleteAccount(accountId);
        expect(resultsForThisTest).toBeNull();
        done();
    });
});