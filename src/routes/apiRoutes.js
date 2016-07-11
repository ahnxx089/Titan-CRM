/////////////////////////////////////////////////
// Routes for the API layer.
//
// @file:   apiRoutes.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var express = require('express');
var apiRouter = express.Router();
var app = express();
var jwt = require('jsonwebtoken');

var router = function (knex) {
    // AUTH
    // ==========================================
    // Comes before the middleware because we need it unsecured
    apiRouter.route('/authenticate').post(function (req, res) {
        var authController = require('../controllers/authController')(knex);
        authController.verifyLoginCredentials(req.body.userId, req.body.password, res);
    });

    // MIDDLEWARE
    // ==========================================
    // Makes sure all requests to our APIs are authenticated
    apiRouter.use(function (req, res, next) {
        //if(req.url !== '/authenticate') {
        // Authenticate the request
        var authController = require('../controllers/authController')(knex);
        authController.authenticateRequest(req, res, next);
        //}
    });


    // USERS
    // ==========================================
    var userApi = require('../api/userApi')(knex);
    apiRouter.route('/users')
        .post(userApi.addUser);
    apiRouter.route('/users/:id')
        .get(userApi.getUserById)
        .put(userApi.updateUser)
        .delete(userApi.deleteUser);


    // PARTIES
    // ==========================================
    var partyApi = require('../api/partyApi')(knex);
    apiRouter.route('/parties')
        .get(partyApi.getParties)
        .post(partyApi.addParty);
    apiRouter.route('/parties/:id')
        .get(partyApi.getPartyById)
        .put(partyApi.updateParty)
        .delete(partyApi.deleteParty);
    
    
    // PERSONS -- TEMPORARILY ADDED BY DINESH,
    // DOES NOT NEED TO BE USED IF NOT WANTED
    // ==========================================
    var personApi = require('../api/personApi')(knex);
    apiRouter.route('/persons')
        .post(personApi.addPerson);
    
    
    // Author: Xiaosiqi Yang
    var leadApi = require('../api/leadApi')(knex);
    apiRouter.route('/leads')
        .post(leadApi.addLead) 
        .get(leadApi.getLeadsByOwner);
    apiRouter.route('/leads/:id')
        .get(leadApi.getLeadById);
    
// updateLead, deleteLead, getLeadsByIdentity and getLeadsByPhoneNumber are not implemented yet, and deleted now. 
    
    

    // CONTACTS
    // ==========================================
    var contactApi = require('../api/contactApi')(knex);
    //
    // NOTE: all GET methods except getContactById are reached
    // on the single route http://localhost:5000/api/contacts 
    //
    apiRouter.route('/contacts')
        .get(contactApi.getContacts)
        .post(contactApi.addContact);
    apiRouter.route('/contacts/:id')
        .get(contactApi.getContactById)
        .put(contactApi.updateContact)
        .delete(contactApi.deleteContact);
    
    // Accounts
    // ==========================================
    var accountApi = require('../api/accountApi')(knex);
    apiRouter.route('/accounts')
        .get(accountApi.getAccounts)
        .post(accountApi.addAccount);
    apiRouter.route('/accounts/:id')
        .get(accountApi.getAccountById)
        .put(accountApi.updateAccount)
        .delete(accountApi.deleteAccount);


    
    // CASES
    // ==========================================
    //
    //
    // NOTE: all GET methods except getCaseById are reached
    // on the single route http://localhost:5000/api/cases
    //
    var caseApi = require('../api/caseApi')(knex); 
    
    apiRouter.route('/cases')
        .get(caseApi.getCases)
        .post(caseApi.addCase);
    apiRouter.route('/cases/:id')
        .get(caseApi.getCaseById)
        .put(caseApi.updateCase)
        .delete(caseApi.deleteCase);

    
    // QUOTES
    // ==========================================
    //
    // NOTE: all GET methods except getQuoteById are reached
    // on the single route http://localhost:5000/api/quotes
    // That includes findQuotes since it is a GET method
    //    
    var quoteApi = require('../api/quoteApi')(knex); 
    
    apiRouter.route('/quotes')
        .get(quoteApi.getQuotes)
        .post(quoteApi.addQuote)
        .put(quoteApi.updateQuoteItem);
    apiRouter.route('/quotes/:id')
        .get(quoteApi.getQuoteById)
        .put(quoteApi.updateQuote);


    // COMMON DATA
    // ==========================================
    //    
    var commonDataApi = require('../api/commonDataApi')(knex); 
    
    apiRouter.route('/common-data')
        .get(commonDataApi.getCommonData);
    
    return apiRouter;
};

module.exports = router;
