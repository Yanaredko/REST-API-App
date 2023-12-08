const { User } = require('../../schemas/user');
const controllerWrapper = require("../../helpers/controllerWrapper");
const HttpError = require('../../helpers/httpError');

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw new HttpError(404, 'User not found');
    }

    if (user.verify) {
      throw new HttpError(400, 'User is already verified');
    }

    user.verify = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: 'Verification successful' });
} 

module.exports = controllerWrapper(verifyEmail);
