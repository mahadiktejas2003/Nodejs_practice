const express = require('express');

const app= express();

const courses=[
    {id:1, name:"DSA"},
    {id:2, name: "WEb dev"},
    {id:3, name:"bruh"}
]

//service
app.get('/', (req, res)=>{
    res.send("Hello World");
});

app.get('/api/courses', (req, res)=>{

    res.send([1,2,3]);

})

// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
    console.log(req.query)
});

// app.get(`api/courses/:id`,(req,res)=>{
//     req.send( req.params.courses[req.params.id]);
// })
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}..`));

