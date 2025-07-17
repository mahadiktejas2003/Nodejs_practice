//logger module or middleware

function log(req, res, next){
    console.log("Logging this request**...");
    next();
}

module.exports= log;