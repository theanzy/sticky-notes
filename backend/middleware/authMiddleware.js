var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH_JWKS_URI,
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER,
  algorithms: ['RS256'],
});

const filterUserData = (model) => async (req, res, next) => {
  const Query = model.find({ user: req.user.sub });
  res._ChainedQuery = Query;
  next();
};

module.exports = {
  checkJwt,
  filterUserData,
};
