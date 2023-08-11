var express = require("express");
var router = express.Router();
const itemController = require("../controllers/itemcontroller");
const Item = require("../models/item");
const Category = require("../models/category");
/* GET home page. */
router.get("/", async function (req, res, next) {
  const [itemCount, categoryCount] = await Promise.all([
    Item.countDocuments().exec(),
    Category.countDocuments().exec(),
  ]);
  res.render("index", { title: "InventoryTracker", itemCount, categoryCount });
});

module.exports = router;
