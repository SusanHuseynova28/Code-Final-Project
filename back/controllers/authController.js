const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyToken = (req) => {
  const token = req.cookies?.access_token; 
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; 
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};


async function signup(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "This email is already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful! Please log in." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, firstName: user.firstName || "User" },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login." });
  }
}


async function logout(req, res) {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error during logout." });
  }
}


async function getMe(req, res) {
  try {
    const userId = verifyToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(userId).select("-password").exec();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch user error:", error.message);
    res.status(500).json({ message: "Server error during fetching user data." });
  }
}




module.exports = { signup, login, logout, getMe };
