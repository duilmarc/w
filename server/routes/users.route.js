const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const giftsController = require("../controllers/gifts.controller");
const { tokenMiddleware } = require("../middlewares/token.middleware");

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/social-login", usersController.socialLogin);
router.post("/:uuid/gift", tokenMiddleware, giftsController.addToUser);

module.exports = router;
