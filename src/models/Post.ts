import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './User';

// Interface describing the Post document data
export interface IPost extends Document {
  content: string;
  author: IUser['_id']; // This will store a reference to a User's ID
}

// Mongoose Schema for the Post
const postSchema: Schema<IPost> = new Schema({
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId, // A special type for unique IDs
    ref: 'User',                 // This creates the link to the 'User' model
    required: true,
  },
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;