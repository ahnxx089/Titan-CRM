/////////////////////////////////////////////////
// RESTful API module for contacts.
//
// @file:    contactApi.js
// @authors: Dinesh Shenoy <astroshenoy@gmail.com>
//           William T. Berg <william.thomas.berg@gmail.com>
/////////////////////////////////////////////////

/* jshint shadow:true */
/* jshint maxcomplexity: false */

var redisClient = require('../config/redisClient');
var winston = require('winston');

var contactApi = function (knex) {

    // Get a reference to data layer module
    //
    var contactController = require('../controllers/contactController')(knex);

    // API methods
    // ==========================================
    //
    // POST /api/contacts
    var addContact = function (req, res) {
        var contact = req.body;
        var user = req.user;

        var resultsForThisUser = contactController.addContact(contact, user);

        /* Intepret the possible outcomes from the controller layer:
            1.  User does not have permission to add a Contact
            2.  User does have permission, but supplied data is not validated
            3.  User does have permission, and a promise is returned
        */
        // null result means user does not have permission to add a Contact
        if (resultsForThisUser === null) {
            res.json({
                message: 'You do not have permission to add contacts!'
            });
        }
        // An array in result means it's array of validation errors
        else if (Object.prototype.toString.call(resultsForThisUser) === '[object Array]') {
            res.json(resultsForThisUser);
        }
        // An object in result means it's a promise (returned only if validation succeeds)
        else {
            resultsForThisUser.then(function (partyId) {
                res.json({
                    partyId: partyId
                });
            });
        }
    };

    // GET /api/contacts
    //
    // Methods:  getContactsByOwner, getContactsByIdentity, getContactsByPhoneNumber
    //
    var getContacts = function (req, res) {

        // getContactsByOwner:  The default if no query strings for identity or phone number
        //
        if (Object.keys(req.query).length === 0) {
            // If the requested data is in cache, get it from there and return it;
            // otherwise call the controller and cache data before sending out
            var redis = redisClient.getClient();
            var cacheKeyName = 'contacts_for_party_id_' + req.user.partyId; // unique key
            redis.get(cacheKeyName, function (err, result) {
                // Data is in the cache
                if (result) {
                    // Convert the cached data string back into JSON before sending out
                    res.json(JSON.parse(result));
                }
                // Data is NOT in the cache
                else {
                    // Log the error
                    winston.error('No redis');
                    // Get contacts from the database
                    var resultsForThisUser = contactController.getContactsByOwner(req.user);
                    // IF ELSE block interprets controller returning an object or null
                    if (resultsForThisUser === null) {
                        res.json({
                            'message': 'You do not have permission to own contacts!'
                        });
                    } else {
                        resultsForThisUser.then(function (contacts) {
                            // Cache the data as a JSON string;
                            // set it to expire after 60 secs
                            redis.setex(cacheKeyName, 60, JSON.stringify(contacts));
                            res.json(contacts);
                        });
                    }
                }
            });
        }

        // GET /api/contacts?firstName=&lastName=
        //
        // getContactsByIdentity: ELSE IF ensures there is only one response to API layer!
        //                        See: http://www.ofssam.com/forums/showthread.php?tid=43
        //
        else if (req.query.hasOwnProperty('firstName') || req.query.hasOwnProperty('lastName')) {

            var resultsForUser = contactController.getContactsByIdentity(req.query, req.user);
            if (resultsForUser === null) {
                res.json({
                    'message': 'You do not have permission to get contacts by the supplied queries!'
                });
            } else {
                resultsForUser.then(function (contacts) {
                    res.json(contacts);
                });
            }
        }

        // GET /api/contacts?contactNumber=&countryCode=&areaCode=
        //
        // getContactsByPhoneNumber
        else if (req.query.hasOwnProperty('contactNumber') || req.query.hasOwnProperty('countryCode') ||
                 req.query.hasOwnProperty('areaCode')                                                       ) {

            var resultsForUser = contactController.getContactsByPhoneNumber(req.query, req.user);
            if (resultsForUser === null) {
                res.json({
                    'message': 'You do not have permission to get contacts by the supplied queries!'
                });
            } else {
                resultsForUser.then(function (contactsWithPhoneNum) {
                    res.json(contactsWithPhoneNum);
                });
            }
        }

        // no other GET routes, return error message so the app does not hang
        else {
            res.json({
                'message': 'ERROR:  No such route to GET from...',
            });
        }
    };

    // GET /api/contacts/:id
    var getContactById = function (req, res) {
        var contactId = req.params.id;
        var resultsForThisUser = contactController.getContactById(contactId, req.user);
        if (resultsForThisUser === null) {
            res.json({
                'message': 'You do not have permission to view contacts!'
            });
        } else {
            resultsForThisUser.then(function (contact) {
                res.json(contact);
            });
        }
    };

    // PUT /api/contacts/:id
    var updateContact = function (req, res) {
        var contactId = req.params.id;
        var user = req.user;
        var contact = req.body;

        var results = contactController.updateContact(contactId, contact, user);

        if (results === null) {
            res.json({
                message: 'You do not have permission to add contacts!'
            });
        } else if ('then' in results) {
            results.then(function (rows) {
                res.json({
                    rowsUpdated: rows
                });
            });
        } else {
            res.json(results);
        }

    };

    // DELETE /api/contacts/:id
    var deleteContact = function (req, res) {
        var contactId = req.params.id;
        contactController.deleteContact(contactId)
            .then(function (result) {
                res.json({
                    deleted: result
                });
            });
    };

    return {
        addContact: addContact,
        getContacts: getContacts,
        getContactById: getContactById,
        updateContact: updateContact,
        deleteContact: deleteContact
    };
};

module.exports = contactApi;