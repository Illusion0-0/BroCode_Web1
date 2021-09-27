const jwt = require("jsonwebtoken");
const errorJson = require("../Operations/errorjson"); //for error json

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send(errorJson("Access denied. No token provided."));

  try {
    // Verify token and get user info from payload (decoded) and put it in req.user object.
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send(errorJson("Invalid token."));
  }
}

module.exports = auth;
