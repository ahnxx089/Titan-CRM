/////////////////////////////////////////////////
// RESTful API module for persons.
// Added by Dinesh for working out knex inserts to 
// more that one table, not part of final app.
//
// @file:   personApi.js
// @author: Dinesh Shenoy <astroshenoy@gmail.com>
/////////////////////////////////////////////////

var personApi = function (knex) {

    // Get a reference to controller layer module
    //
    var personController = require('../controllers/personController')(knex);

    // MIDDLEWARE IS DEACTIVATED FOR NOW...
    // Set up middleware to validate incoming requests
    //
    var middleware = function (req, res, next) {
        next();
    };

    // API methods
    // ==========================================
    //
    // POST /api/persons
    var addPerson = function (req, res) {
        var person = req.body;
        var user = req.user;
        var result = personController.addPerson(person, user);
        console.log('\npersonApi.addPerson:  controller returned result = ', result);
        // An array in result means it's array of validation errors
        if (Object.prototype.toString.call(result) === '[object Array]') {
            res.json(result);
        }
        // An object in result means it's a promise
        // (which is returned only if validation succeeds)
        else {
            result.then(function (partyId) {
                res.json({
                    partyId: partyId
                });
            });
        }
    };

    return {
        addPerson: addPerson
    };
};

module.exports = personApi;
