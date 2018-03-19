const jwt = require('jsonwebtoken')

function getJWT (req, res, next) {
  const data = req.body.response;
  console.log('response');
  console.log(req.body.response);
  const token = jwt.sign(data, process.env.SECRETKEY)
  // console.log(token);
  req.token = token;
  return next()
}

function authJWT (req, res, next) {
  console.log(req.body);
  try {
    console.log('=======JWT SIGN========');
    const decoded = jwt.verify(req.body.token, process.env.SECRETKEY)
    console.log('=======>>>>>>>>>>>>');
    console.log(decoded);
    req.decoded = decoded;

    // need to cross check with userID from db
    return next()
  } catch (err) {
    res.status(401).send(err)
  }
}

function authAdminJWT (req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, process.env.SECRETKEY)
    // console.log(decoded.email);
    if (decoded.email == process.env.ADMINEMAIL) {
      return next()
    } else {
      res.status(401).json({
        message: 'You are not admin'
      })
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports = {
  getJWT: getJWT,
  authJWT: authJWT,
  authAdminJWT: authAdminJWT
}
