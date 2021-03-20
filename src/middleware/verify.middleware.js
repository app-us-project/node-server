const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) =>{
  try{
    const authentication = req.headers.authentication;
    if(!authentication){
      res.status(400).json({message: 'Bad Request, no authentication'});
    }
    jwt.verify(authentication, process.env.JWT_SECRETKEY, (error, decoded) => {
      if(error){
        res.status(401).json({message: "Unauthorization"});
        return;
      }
    console.log(decoded.jti);
    req.auth = {
      id: decoded.jti
    }
    next();
    })
  }catch(error){
    res.status(401).json({message: "key experience error"});
  }
}

module.exports = {verifyToken};