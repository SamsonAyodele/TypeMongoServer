import { model, Schema } from "mongoose";
import { Document } from "mongoose";
import { IUser } from "../interfaces/user-interface";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // And `Schema.Types.ObjectId` in the schema definition.
  organization: { type: Schema.Types.ObjectId, ref: "Organization" },
});

export const UserModel = model<IUser>("User", userSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email }).exec();

export const getUserById = (id: string) => UserModel.findById(id);

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findOneAndUpdate({ _id: id }, values, { new: true }).exec();



  export interface IUserModel extends Document {
    name: string;
    email: string;
  }
