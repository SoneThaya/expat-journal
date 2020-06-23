require("dotenv").config();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../data/jwtConfig.js");


module.exports = {
  isLoggedIn
};

function isLoggedIn(req, res, next){
  const token = req.headers.authorization;

  console.log(token)
  if(token){
    jwt.verify(token, process.env.JWTKEY, (error, decodedToken) => {
      console.log(error)
      if(error){
        res.status(401).json({ message: "Log in to continue"});
      } else {
        req.decodedToken = decodedToken;
        console.log(req.decodedToken)
        next();
      };
    });
  } else {
    res.status(400).json({ message: "Please provide credentials"});
  };
};