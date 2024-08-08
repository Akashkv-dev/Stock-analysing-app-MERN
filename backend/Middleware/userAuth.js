const jwt = require("jsonwebtoken");

function userAuthentication(req, res, next) {
  const token = req.headers.authorization;
  console.log(req.headers.authorization);
  const split= token.split(' ')
  const Token= split[1]
  console.log(Token);
  
  try {
    if (Token == null) return res.sendStatus(401);
    jwt.verify(Token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err) return res.sendStatus(403);
  
      req.user = user;
      if (req.user.role == "user") {
        next();
      }
      else {
          res.sendStatus(403).json({message:'not valid user'})
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports=userAuthentication;
