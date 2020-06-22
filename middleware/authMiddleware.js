require("dotenv").config();
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../data/jwtConfig.js");


module.exports = {
  isLoggedIn
};

function isLoggedIn(req, res, next){
  //const token = req.headers.Authorization;
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const authToken = authHeader.split(" ")[1];
    jwt.verify(authToken, jwtSecret, (error, decodedToken) => {
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