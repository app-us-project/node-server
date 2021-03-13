const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) =>{
    try{
        const token = req.headers[`${process.env.JWT_SERCRETKEY}`];
        req.decoded = jwt.verify(token, process.env.JWT_SERCRETKEY);
        res.locals.user = req.decoded.id;
        return next();
    }catch(e){
        if(e.name == "TokenExpiredError"){
            return res.status(400).json({
                status: "TokenExpired"
            });
        }
        return res.json(401).json({
            status: "invalidToken"
        });
    }
}