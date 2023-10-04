const User = require("../models/user");

const findUserByEmail = email => {
  return User.findOne({ email: email });
};

const findByNameEmail = (email, name) => {
  return User.findOne({ $or: [{ email: email }] });
};

const createNewUser = (email, firstName, lastName, hash) => {
  const user = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hash
  });
  return user.save();
};

const updateUser = (userId, user) => {
  return User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { ...user }
    },
    { new: true }
  );
};
const getAllUsers = () => {
  return User.find();
};
const getUserValue = () => {
  return User.find();
};
module.exports = {
  findUserByEmail,
  updateUser,
  getAllUsers,
  findByNameEmail,
  createNewUser,
  getUserValue
};
