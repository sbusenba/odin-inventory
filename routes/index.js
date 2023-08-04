var express = require("express");
var router = express.Router();
const itemController = require("../controllers/itemcontroller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/items/add", itemController.item_add_get);
router.post("/items/add", itemController.item_add_post);
router.get("/items", itemController.items);

module.exports = router;
