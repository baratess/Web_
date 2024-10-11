const express = require("express");
const router = express.Router();
const Category = require("../Models/Category.js");

// Category create
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;

    const newCategory = new Category({ name, img });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// Category read
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Category read (single)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Category update
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

// Category delete
router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(`${categoryId} has been deleted`);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
