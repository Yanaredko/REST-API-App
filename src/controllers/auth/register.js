const bcrypt = require("bcrypt");
require("dotenv").config();
const gravatar = require('gravatar');

const { HttpError, controllerWrapper } = require("../../helpers");
const { User } = require("../../schemas/user");


const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'identicon' }, true);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword, avatarURL });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL, 
  });
};

module.exports = {
  register: controllerWrapper(register)
};