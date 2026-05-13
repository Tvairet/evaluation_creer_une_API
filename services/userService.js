const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');


exports.getAllUsers = () => {
  return User.find();
};

exports.getUserById = (id) => {
  return User.findById(id);
};

exports.createUser = (data) => {
  const user = new User(data);
  return user.save();
};

exports.updateUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, data, { new: true });
};

exports.patchUser = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

exports.deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

exports.authentification = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email }, '-__v -createdAt -updatedAt');

  if (user) {
    bcrypt.compare(password, user.password, function(err, response) {
      if (err) {
        throw new Error(err);
      }
      if (response) {
        delete user._doc.password;
        const expireIn = 24 * 60 * 60;
        const token    = jwt.sign({
          user: user
        },
      SECRET_KEY,
      {
        expiresIn: expireIn
      });

      res.header('Authorization', 'Bearer' + token);
      return res.status(200).json('authentification réussie');
      }
    return res.status(403).json('mauvais identifiants');
    });
  }else {
    return res.status(404).json('utilisateur non trouvé');
  }
  } catch (error) {
    return res.status(501).json(error);
  }
}