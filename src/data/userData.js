/////////////////////////////////////////////////
// Data access layer module for users.
//
// @file:   userData.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var userData = function(knex) {
    
    /**
     * Add a new user in database
     * @param {Object} user - The new user entity to be added
     * @return {Object} promise - Fulfillment value is id of row inserted
    */
    var addUser = function(user) {
        // TODO
    };
    
    /**
     * Gets one user by its id from database
     * @param {Number} userId - Unique id of the user to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
    */
    var getUserById = function(id) {
        return knex.select('user_login_id', 'password', 'password_hint', 'enabled', 'disabled_date', 'party_id', 'created_date', 'updated_date')
            .from('user_login')
            .where({user_login_id: id});
    };
    
    /**
     * Update a user in database
     * @param {Object} user - The user entity that contains updated data
     * @return {Object} promise - Fulfillment value is number of rows updated
    */
    var updateUser = function(party) {
        // TODO
    };
    
    /**
     * Delete a user from database
     * @param {Number} userId - Unique id of the user to be deleted
     * @return {Object} promise - Fulfillment value is number of rows deleted
    */
    var deleteUser = function(userId) {
        // TODO
    };
    
    /**
     * Gets all security permission groups for a user from database
     * @param {String} id - Id of the user whose permissions are to be fetched
     * @return {Object} promise - Fulfillment value is a raw data object
    */
    var getPermissionGroupsByUserId = function(id) {
        return knex.select('permission_group_id', 'from_date', 'thru_date')
            .from('user_login_security_group')
            .where({user_login_id: id});
    };
    
    /**
     * Gets all security permissions for a user
     * @param {String} id - Id of the user for which we need to fetch permissions
     * @return {Object} promise - Fulfillment value is a raw data object
     */
    var getPermissionsByUserId = function (id) {
        return knex.select('permission_id', 'from_date', 'thru_date')
            .from('security_group_permission')
            .innerJoin('user_login_security_group', 'group_id', 'permission_group_id')
            .where({user_login_id: id});
    };
    
    return {
        addUser: addUser,
        getUserById: getUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getPermissionGroupsByUserId: getPermissionGroupsByUserId,
        getPermissionsByUserId: getPermissionsByUserId
    };
};

module.exports = userData;