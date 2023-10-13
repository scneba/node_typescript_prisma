import { model, Schema, Types } from "mongoose";

export interface Permission {
  name: string;
  createdAt?: Date;
}

const permissionSchema = new Schema<Permission>({
  name: { type: String, maxlength: 50 },
  createdAt: { type: Date, default: Date.now }
});

export const Permission = model<Permission>("Permission", permissionSchema);
