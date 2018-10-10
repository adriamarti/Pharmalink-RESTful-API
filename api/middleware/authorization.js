const token = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization.split(` `)[1];
    console.log(`authorizationToken: ${authorizationToken}`)
    const decoded = token.verify(authorizationToken, process.env.TOKEN_KEY);
    console.log(`decoded: ${decoded}`)
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Authorization failed`
    });
  }
  
};