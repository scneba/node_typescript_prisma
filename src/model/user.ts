import mongoose, {
  model,
  Schema,
  CallbackWithoutResultAndOptionalError
} from "mongoose";
import type { Role } from "./role";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: "Male" | "Female";
  createdAt?: Date;
  password: string;
  name?: string;
  roles: Role[];
}
const userSchema = new Schema<User>({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  name: { type: String },
  email: { type: String, unique: true, required: [true, "email is required"] },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "{VALUE} supplied, should be Male or Female"
    },
    required: [true, "gender is required"]
  },
  password: { type: String, required: [true, "password is required"] },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
  createdAt: { type: Date, default: Date.now }
});
userSchema.pre("save", function (next: CallbackWithoutResultAndOptionalError) {
  this.name = this.firstName + " " + this.lastName;
  next();
});
export const User = model<User>("User", userSchema);
