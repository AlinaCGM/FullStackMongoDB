import mongoose, { Document } from "mongoose";

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: string;
};

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },

  email: {
    type: String,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
});
export default mongoose.model<UserDocument>("User", UserSchema);
