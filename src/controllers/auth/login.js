const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { HttpError, controllerWrapper } = require("../../helpers");
const { User } = require("../../schemas/user");
const { SECRET_KEY } = process.env;


const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify) {
    throw new HttpError(401, "Unauthorized. Please verify your email.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

   if (!isPasswordValid) {
    throw new HttpError(401, 'Unauthorized. Incorrect email or password.');
   }
  
   const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(user._id, { token });
  
  res.json({
    token,
  });
};

module.exports = {
  login: controllerWrapper(login)
};