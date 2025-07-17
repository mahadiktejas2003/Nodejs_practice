const express = require('express');
const router= express.Router();
const Joi= require('joi');
router.use(express.json());

const courses = [
  { id: 1, name: 'web Dev' },
  { id: 2, name: 'dsa' },
  { id: 3, name: 'singing' }
];


//GET fquests:
router.get('/', (req, res) => {
    console.log("GET request received for courses");
  res.send(courses);
});

// get single course by id
router.get(`//:id`, (req,res)=>{  
    const course= courses.find((c)=>c.id=== parseInt(req.params.id));
    if(!course){
        return res.status(404)
                .send('The course with given id is not found');
    }
    res.send(course);//send course

});

// Post a single course
router.post('/', (req, res) => { 
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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
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

module.exports= router; //exporting the router object