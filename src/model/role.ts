import mongoose, { model, Schema, Types } from "mongoose";
import type { Permission } from "./permission";

export interface Role {
  _id: mongoose.Types.ObjectId;
  name: string;
  permissions: Permission[];
  createdAt?: Date;
}

const roleSchema = new Schema<Role>({
  name: { type: String, maxlength: 50 },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission"
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export const Role = model<Role>("Role", roleSchema);
