const PostUnique = require("../models/PostUnique");

module.exports = {
  async store(req, res) {
    const { title, description, childparentid } = req.body;

    const postUnique = await PostUnique.create({
      title,
      description,
      childparentid
    });

    req.io.emit("postUnique", postUnique);

    return res.json(postUnique);
  },

  async index(req, res) {
    const post = await PostUnique.find({ childparentid: req.params.id }).sort(
      "-createdAt"
    );

    return res.json(post);
  }
};
