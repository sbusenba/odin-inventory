const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.render("category_list", {
    title: "Categories",
    categories: categories,
  });
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send(`category ${req.params.id} update, not yet implemented`);
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("category update, not yet implemented");
});

exports.delete_category_get = asyncHandler(async (req, res, next) => {
  res.send("category delete get, not yet implemented");
});
exports.delete_category_post = asyncHandler(async (req, res, next) => {
  res.send("category delete post, not yet implemented");
});

exports.add_category_get = asyncHandler(async (req, res, next) => {
  res.render("category_form", {
    title: "Add Category",
  });
});

exports.add_category_post = [
  asyncHandler(async (req, res, next) => {
    console.log(req.body.categoryname, req.body.categorydescription);
    next();
  }),

  body("categoryname", "Category Must not be empty").trim().notEmpty().escape(),
  body("categorydescription", "Item Must not be empty")
    .trim()
    .notEmpty()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.categoryname,
      description: req.body.categorydescription,
    });
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render("category_form", {
        title: "Create Item",
        category: category,
        errors: errors,
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_detail = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const [category, category_items] = await Promise.all([
    Category.find({ _id: req.params.id }).exec(),
    Item.find({ categories: req.params.id }).exec(),
  ]);
  res.render("category_detail", {
    title: "Category Detail",
    category,
    category_items,
  });
});
