var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categorycontroller");

/* GET home page. */

router.get("/add", categoryController.add_category_get);

router.post("/add", categoryController.add_category_post);
router.get("/:id/update", categoryController.category_update_get);
router.post("/:id/update", categoryController.category_update_post);
router.get("/:id/delete", categoryController.delete_category_get);
router.post("/:id/delete", categoryController.delete_category_post);
router.get("/:id", categoryController.category_detail);
router.get("/", categoryController.category_list);

module.exports = router;
