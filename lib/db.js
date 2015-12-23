//  connecting to mongo with configs
var mongo       = require('mongoskin')
var mongoConfig = require('../configs/mongodb.config')

var mongoURI = 'mongodb://'+mongoConfig.dbHost+':'+ mongoConfig.dbPort+'/'+mongoConfig.dbName
var db = mongo.db(mongoURI, {native_parser:true})


module.exports = db