import { model, Schema, Types } from "mongoose";
import { actions } from "../data";

export interface Permission {
  name: string;
  resource: string;
  action: string;
  createdAt?: Date;
}

const permissionSchema = new Schema<Permission>({
  name: { type: String, maxlength: 50 },
  action: {
    type: String,
    enum: actions,
    default: "get"
  },
  resource: { type: String, maxlength: 50 },
  createdAt: { type: Date, default: Date.now }
});

export const Permission = model<Permission>("Permission", permissionSchema);
