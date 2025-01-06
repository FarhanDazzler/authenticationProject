const ensureAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.json([
    { name: "TV", price: "$200" },
    { name: "Mobile", price: "$100" },
  ]);
});

module.exports = router;
