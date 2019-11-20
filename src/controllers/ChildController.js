const Child = require("../models/Child");

module.exports = {
  async index(req, res) {
    const allChildren = await Child.find();

    return res.json(allChildren);
  },

  async store(req, res) {
    const {
      fullname,
      parentid,
      registration,
      parent
      // avatar
    } = req.body;

    const newChild = await Child.create({
      fullname,
      parentid,
      registration,
      parent
      // avatar
    });

    return res.json(newChild);
  }
};
