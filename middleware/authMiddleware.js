require("dotenv").config();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../data/jwtConfig.js");


module.exports = {
  isLoggedIn
};

function isLoggedIn(req, res, next){
  const token = req.headers.Authorization;

  if(token){
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error){
        res.status(401).json({ message: "Log in to continue"});
      } else {
        req.jwt = decodedToken;
        next();
      };
    });
  } else {
    res.status(400).json({ message: "Please provide credentials"});
  };
};