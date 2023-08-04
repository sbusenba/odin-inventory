const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.items = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).sort({ name: 1 }).populate("categories").exec(),
    Category.find({}).exec(),
  ]);

  res.render("item_list", {
    title: "Items",
    items: items,
    categories: categories,
  });
});
exports.item_add_get = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).sort({ name: 1 }).populate("categories").exec(),
    Category.find({}).exec(),
  ]);

  res.render("item_form", {
    title: "Add Item",
    items: items,
    categories: categories,
  });
});
exports.item_add_post = [
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },
  body("item_name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("quantity", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.item_name,
      description: req.body.item_description,
      price: req.body.price,
      quantity: req.body.quantity,
      categories: req.body.category,
    });
    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}).exec();
      for (const category of allCategories) {
        if (item.category.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: allCategories,
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];
