import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Room = model("Room", roomSchema);

module.exports = Room;
