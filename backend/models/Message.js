import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    unique: false,
    required: false,
    trim: false,
  },
  username: {
    type: String,
    unique: false,
    required: true,
    trim: false,
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
