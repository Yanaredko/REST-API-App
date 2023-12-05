const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const getCurrent = require("./currentUser")

module.exports = {
    login,
    logout,
    register,
    getCurrent
};