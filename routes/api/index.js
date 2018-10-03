const router = require("express").Router();
const historyRoutes = require("./history");

// routes [(/api)/history]
router.use("/history", historyRoutes);


module.exports = router;