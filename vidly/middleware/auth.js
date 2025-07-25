const jwt=  require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    // Middleware logic to authenticate user
    const token = req.header( 'x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');
    
    try{
        const decoded = jwt.verify (token, config.get('jwtPrivateKey'));
        req.user = decoded; //we'll get  {_id: user._id} here in user obj /payload.
        next();
    }
    catch(exception){
        return res.status(400).send('Invalid token.')
    }
}

module.exports = auth;