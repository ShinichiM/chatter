import { User } from "../models";

const userController = {
  addUser(req, res) {
    User.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
  removeUser(req, res) {
    // api parameter requires id
    User.deleteOne({ id: req.body.id })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
  getUser(req, res) {
    User.find({ id: req.body.id })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
