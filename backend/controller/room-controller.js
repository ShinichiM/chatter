const { Room } = require("../models");

const roomController = {
  getUsersInRoom: async function getUsersInRoom(roomNumber) {
    try {
      const roomData = await Room.find({ number: roomNumber });
      console.log(roomData);
      return roomData;
      // await roomData.save();
    } catch (error) {
      console.error(error);
    }
    // await Room.find({ number: roomNumber })
    //   .then((response) => {
    //     console.log(" 0 0 0 - ", response);
    //     return response;
    //   })
    //   .catch((err) => console.error(err));
  },
  addRoom: async function addRoom(roomNumber, userID) {
    try {
      const roomData = await Room.create({
        number: roomNumber,
        users: [userID],
      });
      return roomData;
    } catch (error) {
      console.error(error);
    }
    //   await Room.create(req.body)
    //     .then((response) => res.json(response))
    //     .catch((err) => res.json(err));
  },
};

module.exports = roomController;
