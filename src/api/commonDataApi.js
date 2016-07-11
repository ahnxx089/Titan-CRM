/////////////////////////////////////////////////
// RESTful API module for common data.
//
// @file:   commonDataApi.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var commonDataApi = function (knex) {
    
    // Get a reference to data layer module
    //
    var commonDataController = require('../controllers/commonDataController')(knex);
    
    
    // API methods
    // ==========================================
    //
    // GET /api/common-data
    var getCommonData = function (req, res) {
        commonDataController.getCommonData(req.query.type, req.user)
            .then(function(data) {
                res.json(data);
            });
    };

    return {
        getCommonData: getCommonData
    };
};

module.exports = commonDataApi;