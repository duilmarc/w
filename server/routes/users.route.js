const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const giftsController = require("../controllers/gifts.controller");
const { tokenMiddleware } = require("../middlewares/token.middleware");

router
  .get("/", tokenMiddleware, usersController.getAll)
  .post("/signup", usersController.signup)
  .post("/login", usersController.login)
  .post("/social-login", usersController.socialLogin)
  .post("/add-gift", tokenMiddleware, giftsController.addToUser);

module.exports = router;
