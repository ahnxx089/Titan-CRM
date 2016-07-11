/////////////////////////////////////////////////
// RESTful API module for users.
//
// @file:   userApi.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var userApi = function (knex) {
    
    // Get a reference to data layer module
    //
    var userController = require('../controllers/userController')(knex);
    
    
    // User API methods
    // ==========================================
    //
    // POST /api/users
    var addUser = function (req, res) {
        // TODO
    };

    // GET /api/users/:id
    var getUserById = function (req, res) {
        var userId = req.params.id;
        userController.getUserById(userId)
            .then(function(user) {
                res.json(user);
            });
    };
    
    // PUT /api/users/:id
    var updateUser = function (req, res) {
        // TODO
    };
    
    // DELETE /api/users/:id
    var deleteUser = function (req, res) {
        // TODO
    };

    return {
        addUser: addUser,
        getUserById: getUserById,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
};

module.exports = userApi;