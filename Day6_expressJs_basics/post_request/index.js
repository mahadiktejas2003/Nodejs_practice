const express = require('express');
const app= express();

//middleware
app.use(express.json());

const courses = [
  { id: 1, name: 'web Dev' },
  { id: 2, name: 'dsa' },
  { id: 3, name: 'singing' }
];

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// Post a single course
app.post('/api/courses', (req, res) => { 
    const course={
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
    console.log(courses);
})


const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})

