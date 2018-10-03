const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function(req, res) {
    db.History
      .find(req.query)
      .sort({ date: -1 })
      .then(dbHistory => res.json(dbHistory))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.History
      .findById(req.params.id)
      .then(dbHistory => res.json(dbHistory))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    //console.log("req.body: ", req.body);
    const history = {
      userId: req.body.author,
      message: req.body.message
    };
    db.History
      .create(history)
      .then(dbHistory => res.json(dbHistory))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.History
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbHistory => res.json(dbHistory))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.History
      .findById({ _id: req.params.id })
      .then(dbHistory => dbHistory.remove())
      .then(dbHistory => res.json(dbHistory))
      .catch(err => res.status(422).json(err));
  }
}; 