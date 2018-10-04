const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  _uoId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  userId: {
    type: String,
    index: true,
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  }
})
// This creates our model from the above schema, using mongoose's model method
const History = mongoose.model('history', HistorySchema);

// Export the History model
module.exports = History;