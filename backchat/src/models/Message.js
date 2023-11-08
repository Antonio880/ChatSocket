import mongoose from "mongoose";
import { userSchema } from "./User.js"

const messageSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId},
    text: { type: String, require: true },
    userEnv: userSchema,
    userRec: userSchema
  }, { versionKey: false });

const message = mongoose.model('Message', messageSchema);

export { message };