import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface describing the User document data
export interface IUser extends Document {
  name: string;
  email: string;
}

// Mongoose Schema for the User
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// To prevent model overwrite errors during hot-reloading in development,
// we check if the model already exists before defining it.
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;