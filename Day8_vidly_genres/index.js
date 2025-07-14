const express= require('express')
const app= express();
app.use(express.json());

const Joi= require('joi')

//movie genres-
const genres= [
    {
        id:1,
        genreName:"Romantic"
    },
     {
        id:2,
        genreName:"family"
    },
     {
        id:3,
        genreName:"Youth | Nostalgic"
    },

]

//get all genres request
app.get('/api/genres', (req,res)=>{
    res.send(genres);
});
//get genre by id 
app.get('/api/genres/:id', (req,res)=>{
    const genre= genres.find((gen)=> gen.id === parseInt(req.params.id) );
    //error if genre not exist- 404-not found
    if(!genre){
        res.status(404).send(`unfortunately, the genre with ${req.params.id} not found`);
        return;//exit the request if not found
    }

    res.send(genre);

});

//POST single genre

app.post('/api/genres', (req,res)=>{
    //create the genre- object
    const {error}= validateGenre(req.body);
    console.log(error);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre= {
        id: genres.length + 1,
        genreName: req.body.genreName
    }
    genres.push(genre);
    res.send(genre);
    console.log(genres);
});

//Update /PUT request for updating Genre

app.put('/api/genres/:id',(req,res)=>{
    //get the genre with the id correctly.
    const genre= genres.find((gen)=> gen.id === parseInt(req.params.id) );
    //error if genre not exist- 404-not found
    if(!genre){
        res.status(404).send(`unfortunately, the genre with ${req.params.id} not found`);
        return;//exit the request if not found
    }

    //ip validate
    const {error} = validateGenre(req.body);
    if(error){
        res.status(400)
        .send(error.details[0].message)
    }
    //update genre finally
    genre.genreName=req.body.genreName;
    console.log(genre);
    res.send(genre);
})


function validateGenre(genre){
    const schema={
        genreName: Joi.string().min(2).required()
    }
    return Joi.object(schema).validate(genre);
}

//Delete request to delete a Genre
app.delete('/api/genres/:id',(req,res)=>{
    //get the genre with the id correctly.
    const genre= genres.find((gen)=> gen.id === parseInt(req.params.id) );
    //error if genre not exist- 404-not found
    if(!genre){
        res.status(404).send(`unfortunately, the genre with ${req.params.id} not found`);
        return;//exit the request if not found
    }
    
    //Delete genre
    const index= genres.indexOf(genre);
    genres.splice(index,1);

    //return the deleted genre

    res.send(genre);
    console.log(genres);
})

app.listen(3000, ()=>{
    console.log('the server is runnnin at 3000')
});