const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(403).json({ message: "User doesn't exist", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      res.status(403).json({ message: "Auth Failed", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    if (isPassEqual) {
      return res.status(200).json({
        message: "Sucessfully loggedin",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
    }
  } catch (error) {
    console.log("Login not working", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ name });
    if (user) {
      res.json({ message: "User already exist", success: false });
    }
    // Ensure password is a string
    if (typeof password !== "string") {
      return res.status(400).send({ error: "Password must be a string" });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ message: "User sucessfully created", success: true });
  } catch (error) {
    console.log("signup not working", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { signup, login };
