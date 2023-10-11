import mongoose, { type InferSchemaType } from 'mongoose';
import { capitalize } from '../helpers';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstName: { type: String, lowercase: true, required: true },
  lastName: { type: String, lowercase: true, required: true },
  email: { type: String, lowercase: true, required: true },
  hashedPassword: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

UsersSchema.virtual('fullName').get(function () {
  return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
});

UsersSchema.virtual('url').get(function () {
  return `/users/${this.id}`;
});

interface UsersModel extends InferSchemaType<typeof UsersSchema> {
  fullName: string;
  url: string;
}

export default mongoose.model<UsersModel>('Users', UsersSchema);
