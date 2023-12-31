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
      console.log(errors);
      const allCategories = await Category.find({}).exec();
      for (const category of allCategories) {
        if (item.categories.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }
      res.render("item_form", {
        title: "Create Item",
        item: item,
        categories: allCategories,
        errors,
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
  let [item, allCategories] = await Promise.all([
    Item.findById(req.params.id),
    Category.find({}).exec(),
  ]);
  for (const category of allCategories) {
    if (item.categories.indexOf(category._id) > -1) {
      category.checked = "true";
    }
  }

  res.render("item_form", {
    title: "Add Item",
    item: item,
    categories: allCategories,
  });
});

exports.item_update_post = [
  (req, res, next) => {
    console.log(req);
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
  body("quantity", "Quantity must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log("body:", req.body);
    const item = new Item({
      _id: req.params.id,
      name: req.body.item_name,
      description: req.body.item_description,
      price: req.body.price,
      quantity: req.body.quantity,
      categories: req.body.category,
    });
    if (!errors.isEmpty()) {
      const allCategories = await Category.find({}).exec();
      for (const category of allCategories) {
        if (item.categories.indexOf(category._id) > -1) {
          category.checked = "true";
        }
      }
      console.log(errors);
      res.render("item_form", {
        title: "Update Item",
        item: item,
        categories: allCategories,
        errors: errors,
      });
    } else {
      await Item.findByIdAndUpdate(req.params.id, item);
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id).exec();
  res.render("item_delete", {
    title: "Confirm Delete",
    item: item,
  });
});
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
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

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id })
    .populate("categories")
    .exec();
  console.log(item);
  console.log(item.categories);
  res.render("item_detail", {
    title: item.name,
    item: item,
  });
});
