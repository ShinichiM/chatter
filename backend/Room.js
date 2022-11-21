const rooms = [];

const addRoom = ({ id, room }) => {
  room = room.trim().toLowerCase();
  const existingRoom = room.find((existingRoom) => existingRoom === room);
  if (!existingRoom) rooms.push(room);
};

const getAllRooms = () => {
  return rooms;
};

module.exports = { addRoom, getAllRooms };