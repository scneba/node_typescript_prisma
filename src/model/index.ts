import mongoose, { Schema, Types } from "mongoose";

export interface IPost {
  user: Types.ObjectId;
  title: string;
  post: string;
  createdAt?: Date;
}

const postSchema = new Schema<IPost>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: { type: String },
  post: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model("Post", postSchema);

export const commentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
  comment: { type: String, default: "hahaha" },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer
});
export const Comment = mongoose.model("Comment", commentSchema);

// a setter
//   Comment.path('name').set(function(v) {
//     return v.toU
//   });

//   // middleware
//   Comment.pre('save', function(next) {
//     notify(this.get('email'));
//     next();
//   });
