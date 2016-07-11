/////////////////////////////////////////////////
// Jasmine spec (test suite) for Quote APIs.
//
// @file:   quoteApiSpec.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

/* jshint maxlen:1000 */

var request = require('request');
var apiBaseUrl = 'http://localhost:5000/api/quotes';

// NOTE:  token and baseRequest declarations have been moved down into specific it() blocks
// so that the tests can be customized enough to show what they need to, without each of us
// having to overwrite one token up here outside describe().

xdescribe('Quote API', function () {

    // This test passes because var token and var baseRequest are commented out-- no token, no access! 
    it('is inaccessible without a valid token', function (done) {

        // token and baseRequest request declarations moved in here so can pick a specific user
        /*var token = 'iAmNotAValidToken';
        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token
            }
        });*/

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

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('updateQuote updates a Quote and returns the number of rows updated', function (done) {
        // token and baseRequest request declarations moved in here so can pick a specific user
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NjA0NDIsImV4cCI6MTQ5NzE5NjQ0Mn0.QbGIm52_9Qlr4hxfJXRe3qEnUlpaYY98k5D534adRNw';

        var quoteId = 5; // an existing row in table quote to be updated

        var quote = {
            "quoteTypeId": "PRODUCT_QUOTE",
            "partyId": "70",
            "issueDate": "2016-06-11 20:45:23",
            "statusId": "QUOTE_FINALIZED",
            "currencyUomId": "USD",
            "salesChannelEnumId": "IND_AEROSPACE",
            "validFromDate": "2016-06-11 20:45:23",
            "validThruDate": "2016-09-11 20:45:23",
            "quoteName": "test quote to add items to soon...",
            "description": "UPDATED:  changed sales channel enum id",
            "contactPartyId": "70",
            "createdByPartyId": "100"
        };

        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });

        var quoteId = 5; // an existing row in table quote to be updated

        baseRequest.put(apiBaseUrl + '/' + quoteId, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect('quoteUpdated' in result).toBeTruthy();
                expect(result.numRowsUpdated ===  1).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    // REMINDER TO SELF:  This is a POST method, so make sure not attempting to duplicate an existing row!
    xit('addQuoteItem adds an Item to a Quote and returns the number of rows inserted', function (done) {
        // token and baseRequest request declarations moved in here so can pick a specific user
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NjA0NDIsImV4cCI6MTQ5NzE5NjQ0Mn0.QbGIm52_9Qlr4hxfJXRe3qEnUlpaYY98k5D534adRNw';

        //maybe create a new quote each time?
        //then you can use the id of that quote
        //and you'll never have a duplication
        var quoteItem = {
            'quoteId': '5',
            'quoteItemSeqId': '5',
            'productId': 'testProd2',
            'quantity': null,
            'selectedAmount': null,
            'quoteUnitPrice': null,
            'estimatedDeliveryDate': null,
            'comments': 'testing',
            'isPromo': null,
            'description': 'customers love this product'
        };

        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quoteItem)
        });

        baseRequest.post(apiBaseUrl + '?item', function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect(result.numRowsInserted ===  1).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }

        });
    });

    it('updateQuoteItem updates an Item of a Quote and returns the number of rows updated', function (done) {
        // token and baseRequest request declarations moved in here so can pick a specific user
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NjA0NDIsImV4cCI6MTQ5NzE5NjQ0Mn0.QbGIm52_9Qlr4hxfJXRe3qEnUlpaYY98k5D534adRNw';

        var quoteItem = {
            "quoteId": "5",
            "quoteItemSeqId": "1",
            "productId": "testProd1",
            "quantity": null,
            "selectedAmount": null,
            "quoteUnitPrice": null,
            "estimatedDeliveryDate": null,
            "comments": "testProd1 instead",
            "isPromo": null,
            "description": "testProd1 is nice"
        };

        var baseRequest = request.defaults({
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quoteItem)
        });

        var quoteItem = {
            'quoteId': '5',
            'quoteItemSeqId': '2',
            'productId': 'testProd2',
            'quantity': null,
            'selectedAmount': null,
            'quoteUnitPrice': null,
            'estimatedDeliveryDate': null,
            'comments': 'testProd2 gets slower with age',
            'isPromo': null,
            'description': 'some customers do not mind the speed'
        };

        baseRequest.get(apiBaseUrl + '?item' + quoteId, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect(result.numRowsUpdated ===  1).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    // REMINDER TO SELF:  This is a POST method, so make sure not attempting to duplicate an existing row!
    it('addQuoteItemOption adds an Option to an Item of a Quote and returns the number of rows inserted', function (done) {
        // token and baseRequest request declarations moved in here so can pick a specific user
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NjA0NDIsImV4cCI6MTQ5NzE5NjQ0Mn0.QbGIm52_9Qlr4hxfJXRe3qEnUlpaYY98k5D534adRNw';

        var quoteItemOption = {
            'quoteId': '5',
            'quoteItemSeqId': '1',
            'quoteItemOptionSeqId': '3',
            'quantity': '40',
            'quoteUnitPrice': '12.95'
        };

        baseRequest.get(apiBaseUrl + '?itemOption' + quoteId, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect(result.numRowsInserted ===  1).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    // Author:  Dinesh.  Ran, passed & commented out on June 15, please do not edit without consulting Dinesh first
    it('updateQuoteItemOption updates an Option of an Item of a Quote and returns the number of rows updated', function (done) {
        // token and baseRequest request declarations moved in here so can pick a specific user
        var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NjA0NDIsImV4cCI6MTQ5NzE5NjQ0Mn0.QbGIm52_9Qlr4hxfJXRe3qEnUlpaYY98k5D534adRNw';

        var quoteItemOption = {
            'quoteId': '5',
            'quoteItemSeqId': '1',
            'quoteItemOptionSeqId': '3',
            'quantity': '23',
            'quoteUnitPrice': '11.47'
        };

        baseRequest.get(apiBaseUrl + '?itemOption' + quoteId, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(res.body);
                expect(result.numRowsUpdated ===  1).toBeTruthy();
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

it('quoteApi.getQuoteById returns a quote', function (done) {
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjU2NzI5NDgsImV4cCI6MTQ5NzIwODk0OH0.x2r-faW7TG9bpECXT5UvOhQhpkPYJw6ZtU8HsN93iDM';
    var baseRequest = request.defaults({
        headers: {
            'x-access-token': token
        }
    });
    var quoteId = 2;

    baseRequest.get(apiBaseUrl + '/' + quoteId, function (err, res, body) {
        expect(err).toBeNull();
        try {
            var result = JSON.parse(res.body);
            expect('quoteId' in result).toBeTruthy();
            done();
        } catch (err) {
            fail(err);
            done();
        }
    });
});

});


// Author: Xiaosiqi
describe('getQuotesByAdvanced, (/api/quotes?SOME_PROPERTY) retrieves found quotes in an array, ', function () {
    // THIS IS AN EVERLASTING TOKEN FOR mrQuoteUnquote
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtclF1b3RlVW5xdW90ZSIsInBhc3N3b3JkIjoiJDJhJDA4JDEvbkpoQ1NENmJrVEswWWJKRDlUMk9UWUo5b2NKOS5IbFVHSXVxdEVlaWU0eWkzcGZ1TGJTIiwicGFzc3dvcmRIaW50IjpudWxsLCJlbmFibGVkIjoxLCJkaXNhYmxlZERhdGUiOm51bGwsInBhcnR5SWQiOjEwMCwiY3JlYXRlZERhdGUiOiIyMDE2LTA2LTAyVDAxOjUwOjE2LjAwMFoiLCJ1cGRhdGVkRGF0ZSI6IjIwMTYtMDYtMDJUMDE6NTA6MTYuMDAwWiIsInNlY3VyaXR5UGVybWlzc2lvbnMiOlsiQ1JNU0ZBX1FVT1RFX0NSRUFURSJdLCJpYXQiOjE0NjYwMTQxNTAsImV4cCI6MTQ5NzU1MDE1MH0.PSuvymm14z07yO79Ksik776Vv3jYiVUZmDfIC5mh-4g';
    var baseRequest = request.defaults({
        headers: {
            'x-access-token': token
        }
    });

    // PLEASE COMMENT THIS TEST OUT when doing other normal tests except this one
    xit('should throw errors when nothing is specified, due to route to getQuotesByOwner which has bugs', function (done) {
        baseRequest.get(apiBaseUrl + '?', function (err, res, body) {
            expect(err).toBeNull();
            try {
                expect(body).toBe(undefined);
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    }, 8000);

    it('should return only one quote by specifying the quoteId', function (done) {
            var quoteId = 2;
            baseRequest.get(apiBaseUrl + '?quoteId=' + quoteId, function (err, res, body) {
                expect(err).toBeNull();
                try {
                    //console.log(body);
                    var result = JSON.parse(body);
                    var typeofQuotes = Object.prototype.toString.call(result);
                    // Check whether the return value is an array
                    expect(typeofQuotes).toBe('[object Array]');
                    // Check whether the first in return value has a quote id 2
                    expect(result[0].hasOwnProperty('quoteId')).toBeTruthy();
                    expect(result[0].quoteId).toBe(2);
                    // Call done to finish the async function
                    done();
                } catch (err) {
                    fail(err);
                    done();
                }
            });
        }
        // this number is to change jasmine.DEFAULT_TIMEOUT_INTERVAL, see http://stackoverflow.com/questions/9867601/how-do-i-change-the-timeout-on-a-jasmine-node-async-spec
        , 8000
    );

    it('should return some quotes by specifying the quoteName', function (done) {
        var quoteName = 'ano';
        baseRequest.get(apiBaseUrl + '?quoteName=' + quoteName, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                expect(result.length).toBe(1);
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    }, 10000);


    it('should return some by specifying the status', function (done) {
        var status = 'quote_created';
        baseRequest.get(apiBaseUrl + '?status=' + status, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    it('should return some by specifying the account', function (done) {
        var account = 7;
        baseRequest.get(apiBaseUrl + '?account=' + account, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    it('should return some by specifying the salesChannel', function (done) {
        var salesChannel = 'IND_retail';
        baseRequest.get(apiBaseUrl + '?salesChannel=' + salesChannel, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });



    it('should return some by EXCLUDING nullable columns', function (done) {
        var account = 7;
        var salesChannel = 'IND_retail';
        var extUrl = apiBaseUrl + '?account=' + account + '&salesChannel=' + salesChannel;
        baseRequest.get(extUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    }, 7000);

    it('should return some by specifying only nullable string columns', function (done) {
        var status = 'quote_created';
        var quoteName = 'a%20quot';
        var extUrl = apiBaseUrl + '?status=' + status + '&quoteName=' + quoteName;
        baseRequest.get(extUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

    it('should return ALL quotes by specifying only and any nullable columns TO NULL', function (done) {
        // should not use var status = null OR var status = undefined, etc here. 
        var status = '';
        var quoteName = '';
        var account = '';
        var extUrl = apiBaseUrl + '?status=' + status + '&quoteName=' + quoteName + '&account=' + account;
        //        console.log(extUrl);
        baseRequest.get(extUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });


    it('should return some by specifying nullable columns and other columns (combinations)', function (done) {
        var status = 'quote_created';
        var quoteName = 'qu';
        var salesChannel = 'IND_retail';
        var extUrl = apiBaseUrl + '?status=' + status + '&quoteName=' + quoteName + '&salesChannel=' + salesChannel;
        baseRequest.get(extUrl, function (err, res, body) {
            expect(err).toBeNull();
            try {
                var result = JSON.parse(body);
                var typeofQuotes = Object.prototype.toString.call(result);
                // Check whether the return value is an array
                expect(typeofQuotes).toBe('[object Array]');
                // Call done to finish the async function
                done();
            } catch (err) {
                fail(err);
                done();
            }
        });
    });

});