import mongoose from "mongoose";
import { userSchema } from "./User.js"

const messageSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    text: { type: String, require: true },
    userEnv: { type: String, requite: true },
    userRec: { type: String, requite: true },
    author: { type: String, require: true },
    authorId : { type: String, require: true },
    socketId: { type: String, require: true },
  }, { versionKey: false });

const message = mongoose.model('Message', messageSchema);

export { message };