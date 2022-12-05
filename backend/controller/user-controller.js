const User = require("../models/User");
const { getRoom } = require("../controller/room-controller");

const userController = {
  createUser: async function addUser(name, socketID, messages = []) {
    try {
      const userData = await User.create({
        name: name,
        socketID: socketID,
        messages: messages,
      });
      return userData;
    } catch (error) {
      console.error(error);
    }
  },
  removeUser: async function removeUser(socketID) {
    try {
      const userData = await User.deleteOne({ socketID: socketID });
      return userData;
    } catch (error) {
      console.error(error);
    }
  },
  getUserBySocketId: async function getUser(socketID) {
    try {
      const user = await User.findOne({ socketID: socketID });
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  getUsers: async function getUsers() {
    try {
      const users = User.find({});
      return users;
    } catch (error) {
      console.error(error);
    }
  },
  updateUserRoom: async function updateUserRoom(userID, roomID) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userID, {
        rooms: [roomID],
      });
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  },
  getUserById: async function getUserById(userId) {
    try {
      const userData = await User.findById(userId).lean();
      return userData;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userController;
