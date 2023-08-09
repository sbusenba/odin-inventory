var express = require("express");
var router = express.Router();
const itemController = require("../controllers/itemcontroller");

router.get("/add", itemController.item_add_get);
router.post("/add", itemController.item_add_post);
router.get("/", itemController.items);
router.get("/:id/update", itemController.item_update_get);
router.post("/:id/update", itemController.item_update_post);
router.get("/:id/delete", itemController.item_delete_get);
router.post("/:id/delete", itemController.item_delete_post);
router.get("/:id", itemController.item_detail);

module.exports = router;
