const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.items = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).sort({ name: 1 }).populate("category").exec(),
    Category.find({}).exec(),
  ]);

  res.render("item_list", { items: items, categories: categories });
});
exports.item_add_get = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).sort({ name: 1 }).populate("category").exec(),
    Category.find({}).exec(),
  ]);

  res.render("item_form", { items: items, categories: categories });
});
exports.item_add_post = asyncHandler(async (req, res, next) => {
  const [items, categories] = await Promise.all([
    Item.find({}).sort({ name: 1 }).populate("category").exec(),
    Category.find({}).exec(),
  ]);

  res.render("item_form", { items: items, categories: categories });
});
