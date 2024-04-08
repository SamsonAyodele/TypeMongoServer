import {Types} from "mongoose"


export interface IOrganization {
    name: string;
    address: string;
    // Use `Types.ObjectId` in document interface...
    users: Types.ObjectId[]; // Array<Types.ObjectId>
}