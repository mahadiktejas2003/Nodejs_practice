const express = require('express');
const app= express();
const Joi= require('joi');
const logger= require('./middleware/logger.js')
const authenticate= require('./authenticate.js')
const helmet= require('helmet');
const morgan = require('morgan')
const config= require('config');//configuration package/ module

//debugging
const debug = require('debug')('app:startup');

const courses = require('./routes/courses')
const home = require('./routes/home');

app.use('/api/courses',courses);
app.use('/', home);

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(logger);

//middleware for Authentication
app.use(authenticate )
app.use(helmet());

app.use(express.static('public'));

app.set('view engine','pug');
app.set('views','./views');
// if(app.get('env')==='development'){
//   app.use(morgan('tiny'))
//   console.log('Morgan enabled...')
// }

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})