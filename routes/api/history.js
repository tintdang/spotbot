const router = require("express").Router();
const historyController = require("../../controllers/historyController");

// Matches with "/api/history"
router.route("/")
  .get(historyController.findAll)
  .post(historyController.create);

// Matches with "/api/history/:id"
router
  .route("/:id")
  .get(historyController.findById)
  .put(historyController.update)
  .delete(historyController.remove);

module.exports = router;