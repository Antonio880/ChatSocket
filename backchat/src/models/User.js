import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true},
    email: { type: String },
    password:  { type: String }
  }, { versionKey: false });

const user = mongoose.model('User', userSchema);

export { user, userSchema };