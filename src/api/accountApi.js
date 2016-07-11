/////////////////////////////////////////////////
// RESTful API module for accounts.
//
// @file:   accountApi.js
// @author: Eric Brichetto <brichett13@gmail.com>
/////////////////////////////////////////////////

/* jshint shadow:true */

var accountApi = function (knex) {
    //Not yet functional
    var accountController = require('../controllers/accountController')(knex);
    //Not yet functional
    var middleware = function (req, res, next) {
        next();
    };
    
    
    // API methods
    // ==========================================
    //
    // POST /api/accounts
    var addAccount = function (req, res) {
        var account = req.body;
        var user = req.user;
        var result = accountController.addAccount(account, user);
        // An array in result means it's array of validation errors
        if( Object.prototype.toString.call(result) === '[object Array]' ) {
            res.json(result);
        }
        // An object in result means it's a promise
        // (which is returned only if validation succeeds)
        else {
            result.then(function(partyId) {
               res.json({partyId: partyId}); 
            });
        }
        
        //if( result === null) {
        //    res.json({message: "No permission to access this"});
        //    }
    
    };

    /* getAccountsByIdentity use the value of req.user for passing API methoads by authentication.
       IdentityId didn't read from the API. So, I take user function and response the security loop.
       This forum are really helpful to me. http://www.ofssam.com/forums/showthread.php?tid=37*/
    // GET /api/accounts/?identity=
//    var getAccountsByIdentity = function (req, res) {
//        var resultForThisAccount =
//        accountController.getAccountsByIdentity(req.query, req.user);
//        if( resultForThisAccount == null){
//            res.json({
//                'message': 'You do not have permission to own identiy by accounts!'
//            });
//        } else {
//            resultForThisAccount.then(function (accounts){
//            res.json(accounts);
//            });
//        } 
//    };
    
    // GET /api/accounts/?owner=
//    var getAccountsByOwner = function (req, res) {
//        var ownerId = req.query.owner;
//        console.log(ownerId);
//        accountController.getAccountsByOwner(ownerId)
//            .then(function (accounts) {
//                res.json(accounts);
//            });
//    };
    
    // GET /api/accounts
    var getAccounts = function (req, res) {
        //If nothing is specified in the query string, use getAccountsByOwner as the default
        if (Object.keys(req.query).length === 0) {

            var resultsForThisUser = accountController.getAccountsByOwner(req.user);
            // IF ELSE block interprets controller returning an object or null
            if (resultsForThisUser === null) {
                res.json({
                    'message': 'You do not have permission to own accounts!'
                });
            } else {
                resultsForThisUser.then(function (accounts) {
                    res.json(accounts);
                });
            }
        }
        //If query strings are non-empty, use getAccountsByIdentity
//        else if (req.query.hasOwnProperty('firstName') || req.query.hasOwnProperty('lastName')) {
//
//            var resultsForUser = accountController.getAccountByIdentity(req.query, req.user);
//            if (resultsForUser === null) {
//                res.json({
//                    'message': 'You do not have permission to get accounts by the supplied queries!'
//                });
//            } else {
//                resultsForUser.then(function (accounts) {
//                    res.json(accounts);
//                });
//            }
//        }
        
        /*This function also same like the Identity. Identity need to first_name and last_name and Company_Name.
      PhoneNumber also exist from user part. So, firstly, check out the primary key(user.partyID), and call the phoneNumber data.
    */
    // GET /api/accounts/?phoneNumber=
        else if (req.query.hasOwnProperty('phoneNumber')) {
            var resultForThisAccount = accountController.getAccountByPhoneNumber(req.query, req.user);
            if(resultForThisAccount == null){
                res.json({
                    'message': 'You do not have permission to own phonenumber by accounts!'
                });
            }
            else {
                resultForThisAccount.then(function (accounts){
                    res.json(accounts);
                });
            }
        }
        // Get Account By Identity - there is a continuing issue here where the method does effectively the same thing as GetAccountsByOwner
        else if (req.query.hasOwnProperty('accountId') || req.query.hasOwnProperty('accountName')) {
            var resultForThisAccount =
        accountController.getAccountsByIdentity(req.query, req.user);
            if( resultForThisAccount == null){
                res.json({
                    'message': 'You do not have permission to own identiy by accounts!'
                });
            } 
            else {
                resultForThisAccount.then(function (accounts){
                    res.json(accounts);
                });
            }
//        accountController.getAccounts()
//            .then(function (accounts) {
//                res.json(accounts);
//            });
        }
        else {
            res.json({
                'message': 'ERR: Nothing found from that GET route request.'
            });
        }
    };

    // GET /api/accounts/:id
    var getAccountById = function (req, res) {
         var accountId = req.params.id;
        accountController.getAccountById(accountId, req.user)
            .then(function(party) {
                res.json(party);
            });
    };
    
    // PUT /api/accounts/:id
    var updateAccount = function (req, res) {
        var accountId = req.params.id;
        var accounts = req.body;
        accountController.updateAccount(accountId, accounts)
            .then(function(result) {
               res.json({updated: result}); 
            });
    };
    
    // DELETE /api/accounts/:id
    var deleteAccount = function (req, res) {
        var accountId = req.params.id;
        accountController.deleteAccount(accountId)
            .then(function(result) {
               res.json({deleted: result}); 
            });
    };

    return {
        addAccount: addAccount,
        //getAccountsByIdentity: getAccountsByIdentity,
        //getAccountsByOwner: getAccountsByOwner,
        getAccounts: getAccounts,
        //getAccountByPhoneNumber: getAccountByPhoneNumber,
        getAccountById: getAccountById,
        updateAccount: updateAccount,
        deleteAccount: deleteAccount
    };
};

//Discussion with Dinesh indicates that we may want to heavily consider placing conditions into our
//getAccounts method so that we centralize all requests to get accounts by different attributes 
//under the one getAccounts method. This would help avoid the proliferation of different API method URLs. 
    
module.exports = accountApi;