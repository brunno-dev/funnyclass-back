const express = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");

const PostController = require("../controllers/PostController");
const LikeController = require("../controllers/LikeController");
const PostUniqueController = require("../controllers/PostUniqueController");
const UserController = require("../controllers/UserController");
const ChildController = require("../controllers/ChildController");

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get("/posts", PostController.index);

routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

routes.delete("/posts/:id/delete", PostController.destroy);

routes.post("/postsunique", PostUniqueController.store);

routes.get("/postsunique/:id", PostUniqueController.index);

routes.get("/users", UserController.index);

routes.get("/class", ChildController.index);

routes.post("/class", ChildController.store);

module.exports = routes;
