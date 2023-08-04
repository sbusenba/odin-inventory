var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categorycontroller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Category" });
});

router.get("/add", categoryController.add_category_get);

router.post("/add", categoryController.add_category_post);

module.exports = router;
