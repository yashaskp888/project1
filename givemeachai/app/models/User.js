import * as mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String },
  name: { type: String },
  username: { type: String },
  phone: { type: String },
  razorID: { type: String },
  Razorsecret: { type: String },
  coverPic:{type:String},
  profilePic:{type:String}
});

export default mongoose.models?.User || model('User', UserSchema);