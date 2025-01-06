const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Authorization is required,JWT token missing",
      success: false,
    });
  }
  try {
    const decode = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("err", error);
    return res.status(401).json({
      message: "Unauthorization,Something went wrong",
      success: false,
    });
  }
};

module.exports = ensureAuthenticated;
