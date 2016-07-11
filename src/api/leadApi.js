/////////////////////////////////////////////////
// RESTful API module for leads.
//
// @file:   leadApi.js
// @author: Xiaosiqi Yang <yang4131@umn.edu>
/////////////////////////////////////////////////

// Attention! 
// addLead, getLeadsByOwner, getLeadById are tested and functional. 
// getLeads is not added in apiRoutes, or called from anywhere. Do not remove it yet. 
// getLeadsByIdentity, getLeadsByPhoneNumber, updateLead, deleteLead are deleted. 

var redisClient = require('../config/redisClient');
var winston = require('winston');

var leadApi = function (knex) {

    // Get a reference to data layer module
    var leadController = require('../controllers/leadController')(knex);


    // API methods
    //
    /**
     * Methods in XXXapi.js are called from presentation layer, or by ARC
     * They in turns, stripes the passed params from req, pass params to corresponding functions in leadController
     * In the end of this flow, res will give the json object back to ARC. 
     * @param {Object} req - The HTTP request
     * @param {Object} res - The HTTP response
     * @return {Object} promise - Fulfillment value is id of new party
     */
    // ==========================================

    // POST /api/leads
    /**
     * To add a new lead in database
     * @param {Object} req - The request from presentation layer (ARC)
     * @param {Object} res - The response to presentation layer (ARC)
     */
    var addLead = function (req, res) {
        // lead and user here are striped params from request
        var lead = req.body;
        var user = req.user;

        var resultsForThisUser = leadController.addLead(lead, user);
        if (resultsForThisUser === null) {
            res.json({
                message: 'You do not have permission to add leads!'
            });
        } else {
            // An array in result means it's array of validation errors
            if (Object.prototype.toString.call(resultsForThisUser) === '[object Array]') {
                res.json(resultsForThisUser);
            }
            // An object in result means it's a promise
            // (which is returned only if validation succeeds)
            else {
                resultsForThisUser.then(function (partyId) {
                    res.json({
                        partyId: partyId
                    });
                });
            }
        }
    };


    // Lucas's taking this
    // Credit: Dinesh
    // NOT in use now! (WHY?)
    // GET /api/leads/...
    /**
     * To retrieve a new lead from database, based on various criteria(query strings)
     * @param {Object} req - The request from presentation layer (ARC)
     * @param {Object} res - The response to presentation layer (ARC)
     */
    var getLeads = function (req, res) {

        /* The if blocks test for whether the user entered a query string
            seeking to get Leads by Owner, by Identity or other ways
            (besides getLeadById, which is on a separate route).
           
            Note:  there no longer is a general getLeads()
            function to get all leads, that was just for initial testing.
            Once user authorization is implemented, the only user who should
            be able to get ALL Leads regardless of Owner will be user:admin, 
            and admin will use getLeadsByOwner() for that... that might require
            re-writing leadData.getLeadsByOwner, but that is the
            plan for now.
        */

        // Author: Lucas
        // GET /api/leads?owner=
        //
        // This if block triggers if a query by owner has been made.
        if (req.query.owner) {
            console.info('hello from getLeads in leadAPI');
            var ownerId = req.query.owner;
            leadController.getLeadsByOwner(ownerId)
                .then(function (leads) {
                    res.json(leads);
                });
        }

        // This is a good place to add other route handlings blocks

        // If the request did not properly pass any of the various if consition-tests above,
        // it is not a valid query, make the reponse null.
        else {
            res.json(null);
        }
    };



    // To retrieve existing leads from database based on their creater
    // In use now.
    // Deprecated: GET /api/leads/?owner=
    // In practice: GET /api/leads[/nothing follows]

    // TODO
    // This getLeadsByOwner works fine! 
    // Inspired by Eric's way of doing multiple insertions in addAccount in accountData.js,
    // I might stop returning this method at the end of this file and calling this method directly
    // instead I will call this methods from the now obselete getLeads method, (making it invisible to the ARC)
    // once  Divine Ndifongwa has his getLeadsByIdentity and getLeadsByPhoneNumber working. 
    // Otherwise, it's just not worth right now. 
    // The then getLeads method will call getLeadsByOwner or getLeadsByIdentity or getLeadsByPhoneNumber, 
    // depending on the received parameter(s). 

    var getLeadsByOwner = function (req, res) {
        // if there's /?owner, ownerId is what follows
        //        var ownerId = req.query.owner;
        //        console.log("ownerid in byOwner is " + ownerId);
        // The above approach is now deprecated and not supported
        
        var user = req.user;
        
        var redis = redisClient.getClient();
        var cacheKeyName = 'leads_for_party_id_' + req.user.partyId; // unique key
        
        redis.get(cacheKeyName, function (err, result) {
            // Data is in the cache
            if (result) {
                // Convert the cached data string back into JSON before sending out
                res.json(JSON.parse(result));
            } 
            // Data is NOT in the cache
            else {
                //winston.error(err);
                winston.error('No redis');

                var resultForThisUser = leadController.getLeadsByOwner(user); 
                if (resultForThisUser === null) {
                    res.json({
                        'message': 'You do not have permission to own or view leads!'
                    });
                } else {
                    resultForThisUser.then(function (leads) {
                        redis.setex(cacheKeyName, 60, JSON.stringify(leads));
                        res.json(leads);
                    });
                }
            }
        });
        
        // this prints "admin" to terminal console, not browser console
//        console.log('user in byOwner is ' + user);
//        console.log('userId in byOwner is ' + user.userId);

    };

    // Author: Lucas
    // GET /api/leads/:id
    var getLeadById = function (req, res) {
        var leadId = req.params.id;
        var resultsForUser = leadController.getLeadById(leadId, req.user);

        if (resultsForUser === null) {
            res.json({
                'message': 'You do not have permission to view lead!'
            });
        } else {
            resultsForUser.then(function (lead) {
                res.json(lead);
            });
        }
    };


    return {
        addLead: addLead,
        getLeads: getLeads,
        getLeadsByOwner: getLeadsByOwner,
//        getLeadsByIdentity: getLeadsByIdentity,
//        getLeadsByPhoneNumber: getLeadsByPhoneNumber,
        getLeadById: getLeadById
//        updateLead: updateLead
//        deleteLead: deleteLead

    };
};

module.exports = leadApi;