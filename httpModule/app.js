const http= require('http');

const srvr= http.createServer(function(req,res){

    if(req.url==='/'){
        res.write("Welcome to Home Page");
        res.end();
    }
    if(req.url === '/api/users'){
        const users= [
            {name: "abhi",age:20, isMale:true},
            {name: "sita", age: 22, isMale: false},
            {name: "shambhu", age:24, isMale:true}
        ];
        res.write(JSON.stringify(users));
        res.end();
    }
})

srvr.listen(4005);
console.log("Server is listening on port 4005");