const path = require('path');
const jimp = require('jimp');
const controllerWrapper = require('../../helpers');
const { User } = require('../../schemas/user');

const updateAvatar = async (req, res) => {
  const { userId } = req.user; 
  const image = await jimp.read(req.file.buffer);
  await image.cover(250, 250).writeAsync(req.file.path);

  const fileName = `${userId}_${Date.now()}${path.extname(req.file.originalname)}`;

  await req.file.mv(`public/avatars/${fileName}`);

  const avatarURL = `/avatars/${fileName}`;

  await User.findByIdAndUpdate(userId, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = {
  updateAvatar: controllerWrapper(updateAvatar),
};
