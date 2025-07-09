const http= require('http');
const fs= require('fs');
const url= require('url');

const myServer= http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return res.end();

    const log= `${Date.now()}: ${req.url} New req recieved \n`;
    const myUrl= url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err,data) => {
        // res.end("Hello from server again");

        switch(req.pathname){
            case '/': 
                res.end("HOmePage");
                break;
            case '/about': 
                const username=myUrl.query.name;
                res.end(`Hi, ${username}`);
                break;
            case '/search':
                const search= myUrl.query.search_query;
                res.end("Here are your search results for"+ search);
                break;
            default: 
                res.end("404 Not Found");
        }
    });
});

myServer.listen(8000, () => console.log("Server Started on Port 8000!"));