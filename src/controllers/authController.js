/////////////////////////////////////////////////
// Business logic module for authentication.
//
// @file:   authController.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

/* jshint camelcase: false */

var app = require('express')();
var winston = require('winston');
var validation = require('../common/validation')();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var authController = function (knex) {
    
    // Private key for token-based authentication
    var authSecret = 'ee883743d3290276a650a274c6ef432a5692348f'; // SHA-1 hash for "CustomerIsKing"

    /**
     * Verify login credentials
     * @param {Object} userId - User Id of the user to verify
     * @param {Object} password - Password of the user to verify
     * @param {Object} res - API's response object, needed because of an async call
     * @return {Object} authResult - The verification result (plus token if verification is successful) 
     */
    var verifyLoginCredentials = function (userId, password, res) {
        // Validate the received inputs
        userId = validation.sanitizeInput(userId);
        password = validation.sanitizeInput(password);
        var validationResult = validation.validateString(userId, true, 100, 'userId') +
                                validation.validateString(password, true, 100, 'password');
        if (validationResult !== '') {
            res.json({
                success: false,
                message: validationResult
            });
            return false;
        }
        // Get details of the user in question
        var userController = require('../controllers/userController')(knex);
        userController.getUserById(userId).then(function (user) {
            if (typeof user === 'object' && bcrypt.compareSync(password, user.password)) {
                // Create a token
                var token = jwt.sign(user, authSecret, {
                    expiresIn: 24*60*60 // expires in 1 day
                });
                // Return the verification result with token
                res.json({
                    success: true,
                    message: 'Credentials verified.',
                    token: token
                });
            } else {
                // Either the requested user doesn't exist
                // or the specified userId-password combination is wrong
                winston.info('Credential verification failed for userId: ' + userId + ' and password: ' + password);
                res.json({
                    success: false,
                    message: 'Authentication failed: wrong userId or password.'
                });
            }
        });

    };

    /**
     * Authenticate an incoming API request (through token verification)
     * @param {String} req - Middleware's request object (contains token)
     * @param {Object} res - Middleware's response object
     * @param {Object} next - Middleware's next function
     * @return void
     */
    var authenticateRequest = function (req, res, next) {
        // Check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // Sanitize the token
        token = validation.sanitizeInput(token);
        // Decode the token
        if (token) {
            // Verify the received token
            jwt.verify(token, authSecret, function (err, decoded) {
                if (err) {
                    winston.error(err);
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // If everything is good, save to request for use in other routes
                    req.user = decoded;
                    next();
                }
            });

        } else {
            // If there is no token, return an error
            res.status(403).json({
                success: false,
                message: 'No token provided.'
            });

        }
    };

    return {
        verifyLoginCredentials: verifyLoginCredentials,
        authenticateRequest: authenticateRequest
    };
};

module.exports = authController;