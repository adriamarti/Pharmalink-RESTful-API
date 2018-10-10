const token = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization.split(` `)[1];
    const decoded = token.verify(authorizationToken, process.env.TOKEN_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Authorization failed`
    });
  }
  
};