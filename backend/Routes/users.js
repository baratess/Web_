const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;

    const deletedUser = await User.findOneAndDelete({ email: email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(`${email} has been deleted`);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    // Şifre hash işlemi
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Güncelleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/verify-password", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.status(200).json({ message: "Şifre doğru" });
    } else {
      res.status(400).json({ error: "Şifre yanlış" });
    }
  } catch (error) {
    console.error("Şifre doğrulama hatası:", error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
