const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.add_category_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Add Category",
  });
});

exports.add_category_post = [
  body("category_name", "Must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category_description", "Must not be empty").trim().isLength({ min: 1 }),
  asyncHandler(async (req, res, next) => {
    let errors = validationResult(req);
    const category = new Category({
      name: req.body.category_name,
      description: req.body.category_description,
    });
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Item",
        category: category,
        errors: errors,
      });
    } else {
      await category.save();
      redirect(category.url);
    }
    res.render("category_form", {
      title: "Add Category",
    });
  }),
];
