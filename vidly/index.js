// Joi.objectId = require('joi-objectid')(Joi);
// const rentals = require('./routes/rentals');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();


// throw new Error("Some error occured during Startup")

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));