const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const allUser = await User.find();

    return res.json(allUser);
  }
};
