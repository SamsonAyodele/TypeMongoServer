import { Response, Request } from "express";
import { ResponseCode } from "../interfaces/enums/code-enum";
import { createUser, deleteUserById, getUserByEmail, getUserById, getUsers, IUserModel, updateUserById } from "../models/user-model";
import utility from "../utils";
// import { Document } from "mongoose";s

interface CustomRequest<T> extends Request {
  body: T;
}

class UserController {
  async createUser(req: CustomRequest<IUserModel>, res: Response) {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return utility.handleError(res, "User not found", ResponseCode.NOT_FOUND);
      }
      const userExist = await getUserByEmail(email);
      if (userExist) {
        return utility.handleError(res, "User already exist", ResponseCode.ALREADY_EXIST);
      }
      let user = await createUser({
        name,
        email,
      });
      return utility.handleSuccess(res, "User created successfully", { user }, ResponseCode.SUCCESS);
    } catch (error) {
      return utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await getUsers();
      if (!user) {
        return utility.handleError(res, "User already exist", ResponseCode.NOT_FOUND);
      }
      return utility.handleSuccess(res, "Users found successfully", { user }, ResponseCode.SUCCESS);
    } catch (error) {
      return utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      let userId = req.params.userId;
      const user = await getUserById(userId);
      if (!user) {
        return utility.handleError(res, "User not found", ResponseCode.NOT_FOUND);
      }
      return utility.handleSuccess(res, "User found successfully", { user }, ResponseCode.SUCCESS);
    } catch (error) {
      return utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      let userId = req.params.userId;
      const userExist = await getUserById(userId);
      if (!userExist) {
        return utility.handleError(res, "User not found", ResponseCode.NOT_FOUND);
      } else {
        const user = await updateUserById(userId,   { $set: req.body});
        return utility.handleSuccess(res, "User updated successfully", { user }, ResponseCode.SUCCESS);
      }
    } catch (error) {
      return utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      let userId = req.params.userId;
      const userExist = await getUserById(userId);
      if (!userExist) {
        return utility.handleError(res, "User not found", ResponseCode.NOT_FOUND);
      }
      const user = await deleteUserById(userId)
      return utility.handleSuccess(res, "Deleted successfully", { user }, ResponseCode.SUCCESS);
    } catch (error) {
      return utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }
}

export default UserController;
