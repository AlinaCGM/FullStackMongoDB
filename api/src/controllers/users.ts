import { Request, Response } from "express";
import UserServices from "../services/users";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

export const getUserByIdController = async (
  request: Request,
  response: Response
) => {
  try {
    const userIdFromRequest = request.params.userId;
    //the same name as in router
    if (!userIdFromRequest) {
      response.json({ message: "userId is required" });
      return;
      //in case of conditions we need to return
    }
    const userInfo = await UserServices.getUserById(userIdFromRequest);
    if (!userInfo) {
      response.json({ message: `No user with id ${request.params.userId}` });
      return;
    }
    response.json(userInfo);
  } catch (error) {
    console.log(error);
  }
};

export const createUserController = async (
  request: Request,
  response: Response
) => {
  try {
    //destructure the variable
    const { email, password, firstName, image } = request.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return response.json("This email is already registered");
    }
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName: firstName,
      email: email,
      password: hashedPassword,
      image: image,
    });

    const user = await UserServices.createUser(newUser);
    //user info with _id from DB
    response.json(user);
  } catch (err) {
    response.json("create user error");
  }
};
export const updateUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const updatedUser = await UserServices.updateUserById(
      request.params.userId,
      request.body
    );
    response.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const logInWithPasswordController = async (
  request: Request,
  response: Response
) => {
  try {
    const userData = await UserServices.findUserByEmail(request.body.email);

    if (!userData) {
      response.json({ message: "invalid" });
      return;
    }
    //compare password form login form and DB
    const validPassword = await bcrypt.compare(
      request.body.password,
      userData.password
    );
    if (!validPassword)
      return response.status(400).send("Invalid Email or Password.");

    const token = jwt.sign(
      {
        email: request.body.email,
        _id: userData._id,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    response.json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};
