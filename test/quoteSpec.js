/////////////////////////////////////////////////
// Jasmine spec (test suite) for Quote module.
//
// @file:   quoteSpec.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint shadow:true */
/* jshint jasmine:true */
/* jshint maxlen:1000 */

var knex = require('../src/config/knexConfig')().getConfig();
var quoteController = require('../src/controllers/quoteController')(knex);
var userController = require('../src/controllers/userController')(knex);
var Quote = require('../src/entities/quote');

describe('Quote module, ', function () {

    // Test quoteController.updateQuote where user LACKS security permission -- TEST PASSED
    it('quoteController.updateQuote DENIES a user without permission to own Quotes(s) to update a Quote', function (done) {

        // contactOwnerABC does not have permission to create a Quote (and thus neither to update)
        var user = {
            userId: 'contactOwnerABC',
            password: '$2a$08$iTaPqQ/4W8LSDNBDT18opegvSxo4kWC8SjWNojHP/lhN7eOSTYHJu',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 13,
            createdDate: '2016-05-25T16:07:11.000Z',
            updatedDate: '2016-05-25T16:07:11.000Z',
            securityPermissions: ['CRMSFA_ACT_ADMIN', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW', 'CRMSFA_CASE_CREATE', 'CRMSFA_ACTS_VIEW', 'CRMSFA_ACT_CLOSE', 'CRMSFA_ACT_CREATE', 'CRMSFA_ACT_UPDATE', 'CRMSFA_ACT_VIEW', 'CRMSFA_CONTACTS_VIEW', 'CRMSFA_CONTACT_CREATE', 'CRMSFA_CONTACT_DEACTIVATE', 'CRMSFA_CONTACT_REASSIGN', 'CRMSFA_CONTACT_UPDATE', 'CRMSFA_CONTACT_VIEW', 'CRMSFA_VIEW', 'PARTYMGR_CME_CREATE', 'PARTYMGR_CME_DELETE', 'PARTYMGR_CME_UPDATE', 'PARTYMGR_GRP_UPDATE', 'PARTYMGR_NOTE', 'PARTYMGR_PCM_CREATE', 'PARTYMGR_PCM_DELETE', 'PARTYMGR_PCM_UPDATE', 'PARTYMGR_REL_CREATE', 'PARTYMGR_REL_UPDATE', 'PARTYMGR_ROLE_CREATE', 'PARTYMGR_ROLE_DELETE', 'PARTYMGR_SRC_CREATE', 'PARTYMGR_STS_UPDATE', 'WORKEFFORTMGR_ADMIN'],
            iat: 1464968881,
            exp: 1465055281
        };
        var quoteId = 4; // an existing row in table quote to be updated

        var quote = {
            'quoteTypeId': 'PRODUCT_QUOTE',
            'partyId': '91',
            'issueDate': '2016-06-04 10:49:22',
            'statusId': 'QUOTE_SENT',
            'currencyUomId': 'USD',
            'salesChannelEnumId': 'IND_GEN_SERVICES',
            'validFromDate': '2016-06-04 10:49:22',
            'validThruDate': '2016-12-04 10:49:22',
            'quoteName': 'Saturday morning quote',
            'description': 'created on Saturday morning',
            'contactPartyId': '91',
            'createdByPartyId': '100'
        };

        var resultsForThisUser = quoteController.updateQuote(quoteId, quote, user);
        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Bill (Note: Dinesh has done no editing of this test, and is leaving uncommented since it runs)
    it('quoteController.updateQuote allows a user with permission to update a Quote', function (done) {

        var user = {
            userId: 'mrQuoteUnquote',
            password: '$2a$08$1/nJhCSD6bkTK0YbJD9T2OTYJ9ocJ9.HlUGIuqtEeie4yi3pfuLbS',
            passwordHint: null,
            enabled: 1,
            disabledDate: null,
            partyId: 100,
            createdDate: '2016-06-02T01:50:16.000Z',
            updatedDate: '2016-06-02T01:50:16.000Z',
            securityPermissions: ['CRMSFA_QUOTE_CREATE'],
            iat: 1464964504,
            exp: 1465050904
        };
        var quoteId = 4; // an existing row in table quote to be updated

        var quote = {
            'quoteTypeId': 'PRODUCT_QUOTE',
            'partyId': '91',
            'issueDate': '2016-06-04 10:49:22',
            'statusId': 'QUOTE_SENT',
            'currencyUomId': 'USD',
            'salesChannelEnumId': 'IND_GEN_SERVICES',
            'validFromDate': '2016-06-04 10:49:22',
            'validThruDate': '2016-12-04 10:49:22',
            'quoteName': 'Saturday morning quote',
            'description': 'created on Saturday morning',
            'contactPartyId': '91',
            'createdByPartyId': '100'
        };

        quoteController.updateQuote(quoteId, quote, user)
            .then(function (fulfillment) {
                expect(typeof fulfillment).toBe('number');
                expect(fulfillment).toBeGreaterThan(0);
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });


    // Test quoteController.addQuoteItem where user LACKS security permission -- TEST PASSED
    it('quoteController.addQuoteItem DENIES a user without permission to own Quotes(s) to add an Item to a Quote', function (done) {
        quote = {};
        
        var resultsForThisUser = quoteController.addQuoteItem(quoteItem, user);

        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.updateQuote DENIES a user without permission to own Quotes(s) to update a Quote', function (done) {
        var user = {
            securityPermissions: []
        };

        var quoteId = 4; // an existing row in table quote to be updated
        var quote = {
            'quoteTypeId': 'PRODUCT_QUOTE',
            'partyId': '91',
            'issueDate': '2016-06-04 10:49:22',
            'statusId': 'QUOTE_SENT',
            'currencyUomId': 'USD',
            'salesChannelEnumId': 'IND_GEN_SERVICES',
            'validFromDate': '2016-06-04 10:49:22',
            'validThruDate': '2016-12-04 10:49:22',
            'quoteName': 'Saturday morning quote',
            'description': 'created on Saturday morning',
            'contactPartyId': '91',
            'createdByPartyId': '100'
        };

        // To eliminate any concern that the expect() and done() could be executing prior to the quoteController
        // returning something to test, purposely set resultsForThisUser to a value that is clearly not null.
        var resultsForThisUser = 9999;

        var resultsForThisUser = quoteController.updateQuote(quoteId, quote, user);

        expect(resultsForThisUser).toBeNull();
        done();

        /* COMMENTED OUT, BUT NOT DELETING FOR NOW:  This is how I was previously testing whether or not
            quoteController.updateQuote was returning null or not:
            
                // handle as in the Api layer, with an IF ELSE block to interpret whether the output
                // is a promise or is null (cannot use .then on a null)
                if (resultsForThisUser === null) {
                    expect(resultsForThisUser === null).toBeTruthy();
                    // Call done to finish the async function
                    done();
                } else {
                    var typeOfQuotes = Object.prototype.toString.call(resultsForThisUser);
                    // Check whether the return value is an array
                    expect(typeOfQuotes).toBe('[object Object]');
                    // Call done to finish the async function
                    done();
                }
            That is not a meaningful test, because of course I expect(resultsForThisUser === null).toBeTruthy() 
            if I put that expect() statement inside an IF block that gets triggered only in the event that 
            resultsForThisUser === null, which is the case because the controller returns for a user without permission!
            
            The above much simpler test expect(resultsForThisUser).toBeNull() (followed by done()) is a meaningful
            test (because it is not packing the expect() inside an if block where reaching the expect() test
            BY DEFINITION means the test will pass.  I do not recall writing much simpler test, maybe I have Bill or 
            Anurag to thank for writing the simpler test?  
            
            I note that there appears to be no asynchronicity concern with the simpler test, no concern about 
            expect() and done() executing before the quoteController returns something as resultsForThisUser.
            Just to be extra certain on this point, I initially declare resultsForThisUser to be a nonzero int 
            (to be something definitely not null).  If the quoteController is not returning the expected null before 
            the expect() executes, then the test definitely fails.  To verify that fact, comment out 
            var resultsForThisUser = quoteController.updateQuote(quoteId, quote, user) and watch
            the test purposely fail.
        */

    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.updateQuote allows a user with permission to update a Quote, and it returns the number of rows updated', function (done) {
        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        var quoteId = 5;

        var quote = {
            'quoteTypeId': 'PRODUCT_QUOTE',
            'partyId': '70',
            'issueDate': '2016-06-11 20:45:23',
            'statusId': 'QUOTE_FINALIZED',
            'currencyUomId': 'USD',
            'salesChannelEnumId': 'IND_AEROSPACE',
            'validFromDate': '2016-06-11 20:45:23',
            'validThruDate': '2016-09-11 20:45:23',
            'quoteName': 'test quote to add items to soon...',
            'description': 'UPDATED:  changed sales channel enum id',
            'contactPartyId': '70',
            'createdByPartyId': '100'
        };

        var resultsForThisUser = quoteController.updateQuote(quoteId, quote, user);

        resultsForThisUser
            .then(function (numRowsUpdated) {
                expect(numRowsUpdated === 1).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.addQuoteItem DENIES a user without permission to own Quotes(s) to add an Item to a Quote', function (done) {

        var user = {
            securityPermissions: []
        };

        var quoteItem = {
            'quoteId': '4',
            'quoteItemSeqId': '1',
            'productId': 'testProd2',
            'quantity': null,
            'selectedAmount': null,
            'quoteUnitPrice': null,
            'estimatedDeliveryDate': null,
            'comments': 'testProd2 is high quality',
            'isPromo': null,
            'description': 'customers love this product'
        };

        // To eliminate any concern that the expect() and done() could be executing prior to the quoteController
        // returning something to test, purposely set resultsForThisUser to a value that is clearly not null.
        var resultsForThisUser = 9999;

        var resultsForThisUser = quoteController.addQuoteItem(quoteItem, user);

        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    // REMINDER TO SELF:  This is a POST method, so make sure not attempting to duplicate an existing row!
    xit('quoteController.addQuoteItem allows a user with permission to add an Item to a Quote, and it returns the number of rows added', function (done) {

        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        //maybe create a new quote each time?
        //then you can use the id of that quote
        //and you'll never have a duplication
        var quoteItem = {
            "quoteId": "5",
            "quoteItemSeqId": "4",
            "productId": "testProd1",
            "quantity": null,
            "selectedAmount": null,
            "quoteUnitPrice": null,
            "estimatedDeliveryDate": null,
            "comments": "testProd1 adding as item 2",
            "isPromo": null,
            "description": "testProd1 is well tested"
        };

        var resultsForThisUser = quoteController.addQuoteItem(quoteItem, user);

        resultsForThisUser
            .then(function (numRowsAdded) {
                expect(numRowsAdded === 1).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.updateQuoteItem DENIES a user without permission to own Quotes(s) to update an Item of a Quote', function (done) {

        var user = {
            securityPermissions: []
        };

        var quoteItem = {
            'quoteId': '4',
            'quoteItemSeqId': '3',
            'productId': 'testProd2',
            'quantity': null,
            'selectedAmount': null,
            'quoteUnitPrice': null,
            'estimatedDeliveryDate': null,
            'comments': 'testProd2 gets better with age',
            'isPromo': null,
            'description': 'old customers love this product'
        };

        // To eliminate any concern that the expect() and done() could be executing prior to the quoteController
        // returning something to test, purposely set resultsForThisUser to a value that is clearly not null.
        var resultsForThisUser = 9999;

        var resultsForThisUser = quoteController.addQuoteItem(quoteItem, user);

        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    xit('quoteController.updateQuoteItem allows a user with permission to update an Item of a Quote, and it returns the number of rows updated', function (done) {

        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        //maybe create a new quote each time?
        //then you can use the id of that quote
        //and you'll never have a duplication
        var quoteItem = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "productId": "testProd1",
            "quantity": null,
            "selectedAmount": null,
            "quoteUnitPrice": null,
            "estimatedDeliveryDate": null,
            "comments": "testProd1 is worse than testProd2, but he wants it",
            "isPromo": null,
            "description": "customers stick with testProd1 out of loyalty"
        };

        var resultsForThisUser = quoteController.updateQuoteItem(quoteItem, user)
            .then(function (numRowsUpdated) {
                expect(numRowsUpdated === 1).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.addQuoteItemOption DENIES a user without permission to own Quotes(s) to add an Option to an Item of a Quote', function (done) {

        var user = {
            securityPermissions: []
        };

        var quoteItemOption = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "quoteItemOptionSeqId": "1",
            "quantity": "5.5",
            "quoteUnitPrice": "4.37"
        };

        // To eliminate any concern that the expect() and done() could be executing prior to the quoteController
        // returning something to test, purposely set resultsForThisUser to a value that is clearly not null.
        var resultsForThisUser = 9999;

        var resultsForThisUser = quoteController.addQuoteItemOption(quoteItemOption, user)
            .then(null, function (err){
                fail(err);
                done();
            });

        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    // REMINDER TO SELF:  This is a POST method, so make sure not attempting to duplicate an existing row!
    xit('quoteController.addQuoteItemOption allows a user with permission to add an Option to an Item of a Quote, and it returns the number of rows added', function (done) {

        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        //maybe create a new quote each time?
        //then you can use the id of that quote
        //and you'll never have a duplication
        var quoteItemOption = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "quoteItemOptionSeqId": "2",
            "quantity": "5.5",
            "quoteUnitPrice": "4.37"
        };

        quoteController.addQuoteItemOption(quoteItemOption, user)
            .then(function (numRowsAdded) {
                expect(numRowsAdded === 1).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.updateQuoteItemOption DENIES a user without permission to own Quotes(s) to update an Option of an Item of a Quote', function (done) {

        var user = {
            securityPermissions: []
        };

        var quoteItemOption = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "quoteItemOptionSeqId": "1",
            "quantity": "10.2",
            "quoteUnitPrice": "5.5"
        };

        // To eliminate any concern that the expect() and done() could be executing prior to the quoteController
        // returning something to test, purposely set resultsForThisUser to a value that is clearly not null.
        var resultsForThisUser = 9999;

        var resultsForThisUser = quoteController.updateQuoteItem(quoteItemOption, user);

        expect(resultsForThisUser).toBeNull();
        done();
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('quoteController.updateQuoteItemOption allows a user with permission to update an Option of an Item of a Quote, and it returns the number of rows updated', function (done) {

        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        var quoteItemOption = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "quoteItemOptionSeqId": "2",
            "quantity": "10",
            "quoteUnitPrice": "3"
        };

        var resultsForThisUser = quoteController.updateQuoteItemOption(quoteItemOption, user);

        resultsForThisUser
            .then(function (numRowsUpdated) {
                expect(numRowsUpdated === 1).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });

    it('quoteController.addQuote allows user with authorization to add a Quote', function (done) {
        var user = {
            userId: 'contactOwnerABC',
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        var quote = {
            'quoteTypeId': 'PRODUCT_QUOTE',
            'partyId': '91',
            'issueDate': '2016-06-04 10:49:22',
            'statusId': 'QUOTE_SENT',
            'currencyUomId': 'USD',
            'salesChannelEnumId': 'IND_GEN_SERVICES',
            'validFromDate': '2016-06-04 10:49:22',
            'validThruDate': '2016-12-04 10:49:22',
            'quoteName': 'Saturday morning quote',
            'description': 'created on Saturday morning',
            'contactPartyId': '91',
            'createdByPartyId': '100'
        };
        var result = quoteController.addQuote(quote, user)
            .then(null, function (err) {
                fail(err);
                done();
            });
        expect(result).not.toBeNull();
        done();
    });

    it('quoteController.getQuoteById returns a valid quote', function (done) {
        var id = 1;
        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };

        quoteController.getQuoteById(id, user)
            .then(function (quote) {
                expect(quote instanceof Quote).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });


    // test passed [Lucas]
    it('quoteController.getQuotesByAdvanced returns valid quotes', function (done) {
        var propertyString = {
            quoteName: 'ano',
            salesChannel: 'ind_retail'
        };
        var user = {
            securityPermissions: ['CRMSFA_QUOTE_CREATE']
        };
        quoteController.getQuotesByAdvanced(propertyString, user)
            .then(function (quotes) {
                expect(quotes[0] instanceof Quote).toBeTruthy();
                done();
            })
            .then(null, function (err) {
                fail(err);
                done();
            });
    });


});