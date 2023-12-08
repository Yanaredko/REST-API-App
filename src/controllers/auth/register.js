const bcrypt = require("bcrypt");
require("dotenv").config();
const gravatar = require('gravatar');
const { nanoid } = require('nanoid'); 

const { HttpError, controllerWrapper } = require("../../helpers");
const { User } = require("../../schemas/user");
const sendVerificationEmail = require('../../helpers/sendVerificationEmail');


const register = async (req, res) => {
  const { password, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, "Email is already in use");
  }

  const verificationToken = nanoid();

  const verificationLink = `http://your_domain.com/users/verify/${verificationToken}`;


  // const user = await User.findOne({ email });
  // if (user) {
  //   throw HttpError(409, "Email in use");
  // }

  const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'identicon' }, true);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  await sendVerificationEmail(newUser.email, verificationLink);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL, 
  });
};

module.exports = {
  register: controllerWrapper(register)
};