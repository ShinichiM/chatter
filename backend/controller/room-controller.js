import { Room } from "../models";

const roomController = {
  getUsersInRoom(req, res) {
    Room.find({ id: req.params.room })
      .then((response) => res.json(response.users))
      .catch((err) => res.json(err));
  },
  addRoom(req, res) {
    Room.create(req.body)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },
};

module.exports = roomController;
