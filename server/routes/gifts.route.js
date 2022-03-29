const router = require("express").Router();
const giftsController = require("../controllers/gifts.controller");
const {
  tokenMiddleware,
  adminMiddleware,
} = require("../middlewares/token.middleware");

router
  .get("/", giftsController.getAll)
  .post("/", [tokenMiddleware, adminMiddleware], giftsController.addGift)
  .get("/my", [tokenMiddleware], giftsController.myGifts)
  .get("/:uuid", giftsController.getOne)
  .put("/:uuid", [tokenMiddleware, adminMiddleware], giftsController.editGift)
  .delete(
    "/:uuid",
    [tokenMiddleware, adminMiddleware],
    giftsController.deleteGift
  )
  .post("/:uuid/add", tokenMiddleware, giftsController.addToUser);

module.exports = router;
