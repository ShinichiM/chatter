import { Schema, model } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  socketID: {
    type: String,
    unique: true,
    required: true,
    trim: false,
  },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = User;
