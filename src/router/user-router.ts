import express, { Request, Response } from "express";
import UserController from "../controllers/user-controller";

const router = express.Router()
const userController = new UserController()

const createUserRoute = ()=>{
    router.post("/", (req: Request, res: Response) => {
        return userController.createUser(req, res);
    });

    router.get("/", (req: Request, res: Response)=> {
        return userController.getUser(req, res)
    })

    router.get("/:userId", (req: Request, res: Response)=> {
        return userController.getUserById(req, res)
    })

    router.put("/:userId", (req: Request, res: Response)=> {
        return userController.updateUser(req, res)
    })

    router.delete("/:userId", (req: Request, res: Response)=> {
        return userController.deleteUser(req, res)
    })
    
    return router
}

export default createUserRoute
