const { Room } = require("../models");

const roomController = {
  // returns array of users assocaited with the roomNumber
  getUsersInRoom: async function getUsersInRoom(roomNumber) {
    try {
      const usersInRoom = [];
      const roomData = await Room.find({ number: roomNumber }).populate(
        "users"
      );
      return roomData;
    } catch (error) {
      console.error(error);
    }
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
  },
  getRoom: async function getRoom(roomID) {
    try {
      const roomData = await Room.findById(roomID);
      return roomData;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = roomController;
