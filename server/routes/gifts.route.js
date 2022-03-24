const router = require("express").Router();
const giftsController = require("../controllers/gifts.controller");
const {
  tokenMiddleware,
  adminMiddleware,
} = require("../middlewares/token.middleware");

router.get("/", giftsController.getAll);
router.put(
  "/:uuid",
  [tokenMiddleware, adminMiddleware],
  giftsController.editGift
);
router.get("/:uuid", giftsController.getOne);
router.delete(
  "/:uuid",
  [tokenMiddleware, adminMiddleware],
  giftsController.deleteGift
);
router.post("/", [tokenMiddleware, adminMiddleware], giftsController.addGift);

module.exports = router;
