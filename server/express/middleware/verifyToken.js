const verifyToken = (req, res, next) => {
 const bearerHeader = req.headers['authorization'];

 if (!bearerHeader) {
   const [bearer, token] = bearerHeader.split(' ');
   req.token = token;
   next();
 } else {
   res.status(401).json({
     message: "Unauthorized"
   })
 }
}

module.exports = { verifyToken }
