const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
console.log(secretKey);

module.exports = {
  generateToken: (user) => {
    return jwt.sign( {user} , secretKey);
  },
  secretKey
};