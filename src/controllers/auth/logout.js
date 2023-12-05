const { User } = require("../../schemas/user");
const controllerWrapper = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

module.exports = {
  logout: controllerWrapper(logout)
};