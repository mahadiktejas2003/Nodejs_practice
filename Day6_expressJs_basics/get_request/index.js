const express = require('express');
const app= express();

const courses = [
  { id: 1, name: 'web Dev' },
  { id: 2, name: 'dsa' },
  { id: 3, name: 'singing' }
];

app.get('/app/courses', (req, res) => {
  res.send(courses);
});

// get single course by id

app.get(`/app/courses/:id`, (req,res)=>{
    const course= courses.find((c)=>c.id=== parseInt(req.params.id));
    if(!course){
        return res.status(404)
                .send('The course with given id is not found');
    }
    res.send(course);//send course

});

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})

