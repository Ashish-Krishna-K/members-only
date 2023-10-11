import mongoose, { type InferSchemaType } from 'mongoose';
import { capitalize } from '../helpers';

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  _title: { type: String, lowercase: true, required: true },
  text: { type: String, lowercase: true, required: true },
  timeStamp: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
});

MessagesSchema.virtual('title').get(function () {
  return this._title.split(' ').map(capitalize).join();
});

MessagesSchema.virtual('url').get(function () {
  return `/users/${this.id}`;
});

interface MessagesModel extends InferSchemaType<typeof MessagesSchema> {
  title: string;
  url: string;
}

export default mongoose.model<MessagesModel>('Messages', MessagesSchema);
