  
module.exports = {
  jwtSecret:
  process.env.JWTKEY ||
  "secret",
  bcrypt_rounds:
  process.env.BCRYPT_ROUNDS ||
  8,
};