const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec()
    res.render("index", {
      title: "Inventory Home",
      categories: categories
    });
});

exports.items_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find({ category: req.params.id }).exec()
    res.render("items_list", {
      title: "All CPUs",
      items: items
    });
});