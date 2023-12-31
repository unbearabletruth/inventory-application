const Item = require("../models/item");
const Category = require("../models/category");
const fileValidation = require('./fileValidation');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const fs = require('fs')
const path = require('path');

exports.item_details = asyncHandler(async (req, res, next) => {
    const [item, category] = await Promise.all([
      Item.findById(req.params.itemId).exec(),
      Category.findById(req.params.id).exec(),
    ]) 
    if (item === null) {
      const err = new Error("Item not found");
      err.status = 404;
      return next(err);
    }
    res.render("item_details", {
      item: item,
      category: category
    });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find().exec()
  res.render("item_form", { 
    title: "Create item",
    categories: categories,
    current_category: req.params.id
  });
});

exports.item_create_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Category description must contain at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("category", "Choose category.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let url, fileError;
    if (req.file){
      url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      fileError = fileValidation.auth(req)
    }

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      imageUrl: url
    });

    if (!errors.isEmpty() || fileError) {
      const categories = await Category.find().exec()
      res.render("item_form", {
        title: "Create item",
        categories: categories,
        item: item,
        current_category: req.params.id,
        errors: errors.array(),
        fileError: fileError
      });
      const filepath = `./public/images/${path.basename(item.imageUrl)}`
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      return;
    } else {
      const itemExists = await Item.findOne({ name: req.body.name }).exec();
      if (itemExists) {
        res.redirect(itemExists.url);
      } else {
        await item.save();
        res.redirect(item.url);
      }
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId).exec();
  if (item === null) {
    res.redirect(`/category/${req.params.id}`);
  }
  res.render("item_delete", {
    item: item
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId).exec();
  await Item.findByIdAndRemove(item._id);
  const filepath = `./public/images/${path.basename(item.imageUrl)}`
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  res.redirect(`/category/${req.params.id}`);
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, categories] = await Promise.all([
    Item.findById(req.params.itemId).exec(),
    Category.find().exec()
  ]) 
  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_form", { 
    title: "Update item",
    categories: categories,
    item: item
  });
});

exports.item_update_post = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description", "Category description must contain at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  body("category", "Choose category.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("number_in_stock", "Item must have a price.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let url, fileError;
    if (req.file){
      url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      fileError = fileValidation.auth(req)
    }
    
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      imageUrl: req.file ? url : req.body.imageUrl,
      _id: req.params.itemId
    });

    if (!errors.isEmpty() || fileError) {
      const categories = await Category.find().exec()
      res.render("item_form", {
        title: "Create item",
        categories: categories,
        item: item,
        fileError: fileError,
        errors: errors.array(),
      });
      const filepath = `./public/images/${path.basename(item.imageUrl)}`
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
      return;
    } else {
      await Item.findByIdAndUpdate(req.params.itemId, item, {});
      res.redirect(item.url);
    }
  }),
];