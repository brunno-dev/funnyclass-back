const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    const { author, description, hashtags } = req.body;
    const image = req.file.secure_url;

    const post = await Post.create({
      author,
      // owner: req.user._id,
      description,
      hashtags,
      image: image
    });

    req.io.emit("post", post);

    return res.json(post);
  },

  async destroy(req, res) {
    const postDelete = await Post.findByIdAndRemove(req.params.id);

    req.io.emit("postDelete", postDelete);

    return res.json();
  }
};
