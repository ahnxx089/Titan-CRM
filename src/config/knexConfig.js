/////////////////////////////////////////////////
// Configuration for Knex ORM.
//
// @file:   knexConfig.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var knex = require('knex');

var knexConfig = function() {
    var getConfig = function() {
        return knex({
            client: 'mysql',
            connection: process.env.JAWSDB_URL || 'mysql://root:@localhost/titan_crm'
            // Use env variable from Heroku in priority whenever possible
            // connection string (one liner way to how to connect): type of connect://userName:password@host/databaseName
        });
    };
    
    return {
        getConfig: getConfig
    };
};
module.exports = knexConfig;