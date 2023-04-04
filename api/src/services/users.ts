import User, { UserDocument } from "../models/User";

const createUser = async (
  user: UserDocument
): Promise<UserDocument | string> => {
  //returns a promise
  const foundUser = await User.findOne({ email: user.email });
  if (!foundUser) return user.save();
  else return "available";
  //2 jobs: 1. save the user to DB, 2. return the user info from the DB and with new info info from the FRONT end side
};

const getUserList = async (): Promise<UserDocument[]> => {
  return User.find();
};
const getUserById = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findById(userId);
  return foundUser;
};

const updateUserById = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
    //it returns the newest info
  });
  return foundUser;
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const foundUser = await User.findOne({ email: email });
  return foundUser;
};

export default {
  createUser,
  getUserList,
  getUserById,
  updateUserById,
  findUserByEmail,
};
