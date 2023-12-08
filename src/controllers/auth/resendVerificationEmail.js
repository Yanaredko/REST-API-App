const { User } = require('../../schemas/user');
const sendVerificationEmail = require('../../helpers/sendVerificationEmail');
const { HttpError, controllerWrapper } = require('../../helpers');
const { nanoid } = require('nanoid');

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new HttpError(400, 'missing required field email');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (user.verify) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  const verificationToken = nanoid();
  user.verificationToken = verificationToken;
  await user.save();


  await sendVerificationEmail(email, verificationToken);

  return res.status(200).json({ message: 'Verification email sent' });
};

module.exports = controllerWrapper(resendVerificationEmail);
