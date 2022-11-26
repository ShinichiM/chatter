const User = require("../models/User"); 

const userController = {
  addUser(req, res) {
    User.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => console.error(err));
  },
  removeUser(req, res) {
    // api parameter requires id
    User.deleteOne({ id: req.params.id })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
  getUser(req, res) {
    User.find({ id: req.params.id})
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
