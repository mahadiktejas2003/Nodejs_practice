const express = require('express');
const app= express();
const Joi= require('joi');
const logger= require('./logger')
const authenticate= require('./authenticate.js')
app.use(express.json());

app.use(logger);

//middleware for Authentication
app.use(authenticate )

const courses = [
  { id: 1, name: 'web Dev' },
  { id: 2, name: 'dsa' },
  { id: 3, name: 'singing' }
];

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