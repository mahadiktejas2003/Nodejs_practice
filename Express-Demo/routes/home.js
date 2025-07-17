const express= require('express');
const router= express.Router();


router.get('/', (req,res)=>{
  res.render('index', {
    title: "My express application",
    message:"how do u do buddy?",
    msg2: "This is a pug template"
  })
})

module.exports= router;