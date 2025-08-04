const winston = require('winston');
module.exports = function errHandler (err, req, res, next){

winston.error(err.message, err);
//err handling middlware
 res.status(500).send('Something Failed.');

}