import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    password:  { type: String, required: true }
  }, { versionKey: false });

const user = mongoose.model('User', userSchema);

export { user, userSchema };