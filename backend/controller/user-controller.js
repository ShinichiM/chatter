const User = require("../models/User");

const userController = {
  addUser: async function addUser(name, socketID, messages = []) {
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
    // return await User.create({
    //   name: name,
    //   socketID: socketID,
    //   rooms: rooms,
    //   messages: messages,
    // })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
  },
  removeUser: async function removeUser(socketID) {
    try {
      const userData = await User.deleteOne({ socketID: socketID });
      return userData;
    } catch (error) {
      console.error(error);
    }
    // api parameter requires id
    // return await User.deleteOne({ socketID: socketId })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  },
  getUser: async function getUser(socketID) {
    try {
      const user = await User.find({ socketID: socketID });
      return user;
    } catch (error) {
      console.error(error);
    }
    //   return await User.find({ socketID: socketId })
    //     .then((response) => console.log(response))
    //     .catch((err) => console.log(err));
  },
  getUsers: async function getUsers(socketID, name) {
    try {
      const users = User.findOne({ socketID: socketID, name: name });
      return users;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userController;
