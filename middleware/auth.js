const jwt = require("jsonwebtoken");


function authenticate(req,res,next){

    console.log("Auth middleware hit");
    const header = req.headers.authorization;


    if(!header){
        return res.status(401).json({
            error:"No token"
        });
    }


    const token = header.split(" ")[1];


    try{

        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = user;

        next();

    }catch(error){

        res.status(401).json({
            error:"Invalid token"
        });

    }
}


module.exports = authenticate;