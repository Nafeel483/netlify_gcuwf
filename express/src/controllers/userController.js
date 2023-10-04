const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  generateToken
} = require("./../helpers/helper");
const userService = require("../services/userService");
const { sendEmail } = require("../helpers/email");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const person = await userService.findByNameEmail(email);
    if (person && person.email === email)
      return res.status(400).send("Email already registered!");
    const hash = await hashPassword(password);
    const register = await userService.createNewUser(
      email,
      firstName,
      lastName,
      hash
    );
    res.status(201).json({ register, message: "Successfully registered!" });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (!user) return res.status(404).send("Email is not registered!");
    const passwordCheck = await comparePassword(
      req.body.password,
      user.password
    );
    if (!passwordCheck) return res.status(400).send("Password do not match");
    const token = generateToken(user);
    if (!token) return res.status(500).send("Error in generating token");
    res
      .status(201)
      .json({ user: user, token, message: "Successfully logged in" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(400).json({ message: "Can't update profile" });
      return;
    }
    res
      .status(201)
      .json({ user: user, message: "Successfully Updated Profile!" });

    console.log("The User: ", res)
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.emailSendUser = async (req, res) => {
  console.log("The Email is", req.body.email)
  try {
    if (req.body.email === "") {
      return res.status(400).json({ message: "no email provided" });
    }
    const result = await sendEmail(req.body.id, req.body.email);
    console.log("The Result of Send Email is", result)
    if (result.error || result === false) {
      return res.status(400).json({ message: "fail to send email" });
    } else {
      return res.status(200).json({ message: "email sent sucessfully" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(201).json({ user: users });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports.getUserValue = async (req, res) => {
  try {
    const users = await userService.getUserValue();
    res.status(201).json({ user: users });
  } catch (error) {
    res.status(400).json(error);
  }
};