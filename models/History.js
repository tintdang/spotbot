var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
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
var History = mongoose.model('history', HistorySchema);

// Export the History model
module.exports = History;