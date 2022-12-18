const { Room } = require("../models");

const roomController = {
  // returns array of users assocaited with the roomNumber
  getUsersInRoom: async function getUsersInRoom(roomNumber) {
    try {
      const roomData = await Room.find({ number: roomNumber }).populate(
        "users"
      );
      return roomData;
    } catch (error) {
      console.error(error);
    }
  },
  createRoom: async function createRoom(roomNumber, userID) {
    try {
      const roomData = await Room.create({
        number: roomNumber,
      })
      // .then((data) => {
      //   data.users.push(userID);
      // });
      // roomData.save();
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
  getRoomByRoomNumber: async function getRoomByRoomNumber(roomNumber) {
    try {
      const roomData = await Room.find({ number: roomNumber });
      return roomData;
    } catch (error) {
      console.error(error);
    }
  },
  // updateUsersInRoom: async function updateUsersInRoom(roomId, userId) {
  //   try {
  //     const roomData = await Room.update( {_id: roomId, { $push: { users: userId } } } )
  //   }
  // }
};

module.exports = roomController;
