import { model, Schema } from "mongoose";
import { IOrganization } from "../interfaces/organization-interface";

// 2. Create a Schema corresponding to the document interface.
const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    // And `Schema.Types.ObjectId` in the schema definition.
    users: { type: [Schema.Types.ObjectId], ref: "user" },
  });
  
  const Organization = model<IOrganization>("organization", organizationSchema);
  
  export default Organization;