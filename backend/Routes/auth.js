const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../Models/User");
require("dotenv").config();

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5173/auth/verify?token=${token}`;

  try {
    const response = await fetch("https://api.elasticemail.com/v2/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apikey: process.env.VITE_EMAIL_API_KEY, // API anahtarını buraya ekle
        to: email,
        from: process.env.VITE_EMAIL_SECRET_FROM,
        subject: "Email Verification",
        bodyHtml: `<p>To verify your email, please click the link below:</p><a href="${verificationLink}">Verify Email</a>`,
        isTransactional: true,
      }),
    });

    if (response.ok) {
      console.log("Verification email sent.");
    } else {
      console.error("Failed to send verification email.");
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Kullanıcı Oluşturma (Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, address } = req.body;

    const existingUserEmail = await User.findOne({ email });
    const existingUserUsername = await User.findOne({ username });

    // const generateVerificationToken = () => {
    //   return crypto.randomBytes(32).toString("hex");
    // };

    if (existingUserEmail) {
      return res
        .status(400)
        .json({ error: "Email address is already registered." });
    }
    if (existingUserUsername) {
      return res
        .status(400)
        .json({ error: "Username address is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const verificationToken = generateVerificationToken();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // verificationToken,
      // isVerified: false,
      role,
      address,
    });

    await newUser.save();
    // await sendVerificationEmail(email, verificationToken);
    return res.status(201).json({
      // message: "User registered, verification email sent.",
      username,
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı girişi (Login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      isLogin: user.isLogin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// Kullanıcı doğrulama (Verify)
router.get("/verify", async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).send("Invalid or expired token.");
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.send("Your email has been verified!");
});

module.exports = router;
