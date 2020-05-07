const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createUser = async (req, reply) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    });
    user.save();
    reply.send({
      status: 'ok'
    })
    // return {
    //   status: 201,
    //   message: 'User has been successfully created'
    // }
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

// exports.authorizeUser = async (req, reply) => {
//       try {
//         const email = req.body.email;
//         const user = await User.findOne({ email }, (err, userInfo) => {
//           if (err) {
//             next(err)
//           } else {
//             if (userInfo.comparePasswords(req.body.password, userInfo.password)) {
//               const token = jwt.sign({
//                 id: userInfo.comparePasswords()
//               })
//             }
//           }
//         })
//       } catch (e) {
//         fastify.log.error(e);
//     process.exit(1)
//   }
// }