const router = require("express").Router();
const historyRoutes = require("./history");
const userRoutes = require("./user");

// routes [(/api)/history]
router.use("/history", historyRoutes);
// routes [(/api)/user]
router.use("/user", userRoutes);

module.exports = router;