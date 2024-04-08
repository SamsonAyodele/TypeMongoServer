import { Types} from "mongoose"


export interface IUser {
    name: string;
    email: string;
    // Use `Types.ObjectId` in document interface...
    organization: Types.ObjectId;
}


