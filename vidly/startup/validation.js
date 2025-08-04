const Joi = require('joi');

module.exports = function() {
  Joi.objectId = () =>
    Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid ObjectId');

  //here the joi.objectId() method is defined to validate MongoDB ObjectId strings.
  // the joi.objecId no more requires an external package like joi-objectid.
  // It uses a regular expression to check if the string is a valid ObjectId format.
};