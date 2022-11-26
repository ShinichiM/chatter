const router = require("express").Router();
const {
  addUser,
  removeUser,
  getUser,
} = require("../controller/user-controller");
const { getUsersInRoom, addRoom } = require("../controller/room-controller");

router.route("/").get(getUser);
router.route("/api/user").post(addUser);
router.route("/api/user/:id").get(getUser).delete(removeUser);
router.route("/api/room").post(addRoom);
router.route("/api/room/:room").get(getUsersInRoom);
