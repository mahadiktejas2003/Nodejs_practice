const express = require('express');
const app= express();
const Joi= require('joi');
const logger= require('./logger')
const authenticate= require('./authenticate.js')
const helmet= require('helmet');
const morgan = require('morgan')
const config= require('config');//configuration package/ module

//debugging
const debug = require('debug')('app:startup');

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(logger);

//middleware for Authentication
app.use(authenticate )
app.use(helmet());

app.use(express.static('public'));

// if(app.get('env')==='development'){
//   app.use(morgan('tiny'))
//   console.log('Morgan enabled...')
// }

const courses = [
  { id: 1, name: 'web Dev' },
  { id: 2, name: 'dsa' },
  { id: 3, name: 'singing' }
];

console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
console.log(`NODE_ENV value with app.get('env') is ${app.get('env')}`);

console.log('Application name', config.get('name'));
console.log('Mail Server', config.get('mail.host'));

//printing tthe env variable-
console.log('Mail password', config.get('mail.password'));

//debugging
if(app.get('env')==='development'){
  app.use(morgan('tiny'))
  // console.log("Morgan is enabled for dev env ...")
 debug('Morgan is enabledd...');
}

//db related work-
// dbDebugger('Connected to the database...');


//GET requests:
app.get('/api/courses', (req, res) => {
    console.log("GET request received for courses");
  res.send(courses);
});

// get single course by id
app.get(`/api/courses/:id`, (req,res)=>{  
    const course= courses.find((c)=>c.id=== parseInt(req.params.id));
    if(!course){
        return res.status(404)
                .send('The course with given id is not found');
    }
    res.send(course);//send course

});

// Post a single course
app.post('/api/courses', (req, res) => { 
  // INPUT VALIDATIONS:
  const schema={
    name: Joi.string().min(3).required()
  };

  const {error} = validateCourse(req.body);
  console.log(error);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  const course={
      id: courses.length+1,
      name: req.body.name
  };
  courses.push(course);
  res.send(course);
  console.log(courses);
})


//HTTP PUT requests

app.put('/api/courses/:id',(req,res)=>{
  //look up the course
  const course= courses.find((c)=>c.id=== parseInt(req.params.id));
  if(!course){
      return res.status(404)
              .send('The course with given id is not found');
  }

  //validate, else 400 error
    // INPUT VALIDATIONS:
  const {error} = validateCourse(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name= req.body.name;
  console.log(courses);
  res.send(course); 
})

   // function for INPUT VALIDATIONS on requests:
function validateCourse(course){
  const schema={
    name: Joi.string().min(3).required()
  };
  return Joi.object(schema).validate(course);

}

//HTTP DELETE Request
app.delete('/api/courses/:id',(req,res)=>{
   //1. look up the course
  const course= courses.find((c)=>c.id=== parseInt(req.params.id));
  if(!course){
      return res.status(404)
              .send('The course with given id is not found');
  }
  //Delete
  const index= courses.indexOf(course);
  courses.splice(index,1); //deleted 

  //return the value deleted
  res.send(course);
  console.log(courses);

})

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})