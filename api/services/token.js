const token = require('jsonwebtoken');

const tokenExpiration = `1h`;

module.exports = (email, id) => {
  return token.sign(
    {
      email: email,
      userId: id
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: tokenExpiration
    });
};