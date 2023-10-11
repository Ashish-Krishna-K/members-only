import 'dotenv/config.js';
import mongoose from 'mongoose';
import User from './src/models/userModels';
import Message from './src/models/messageModels';

mongoose.set('strictQuery', false);

async function connectToDb() {
  try {
    if (process.env.MONGODB_URI) {
      console.log('connecting to db...');
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('connected to db');
    } else {
      throw new Error('A URI to the database is not found. Please add a URI to the MONGODB_URI environment variable');
    }
  } catch (error) {
    console.error(error);
  }
}

const guestUser = new User({
  firstName: 'guest',
  lastName: 'user',
  email: 'guest.user@email.com',
  hashedPassword: 'password',
});

const memberUser = new User({
  firstName: 'member',
  lastName: 'user',
  email: 'member.user@email.com',
  hashedPassword: 'password',
  isMember: true,
});

const adminUser = new User({
  firstName: 'admin',
  lastName: 'user',
  email: 'admin.user@email.com',
  hashedPassword: 'password',
  isMember: true,
  isAdmin: true,
});

const addToDb = async () => {
  try {
    const guest = await guestUser.save();
    console.log('guest created');
    const guestMessage = new Message({
      _title: 'Message from guest',
      text: 'This is a test',
      createdBy: guest.id,
    });
    guestMessage.save();
    console.log('added a message from guest');
    const member = await memberUser.save();
    const memberMessage = new Message({
      _title: 'Message from member',
      text: 'This is a test',
      createdBy: member.id,
    });
    console.log('member created');
    memberMessage.save();
    console.log('added a message from member');
    const admin = await adminUser.save();
    console.log('admin created');
    const adminMessage = new Message({
      _title: 'Message from admin',
      text: 'This is a test',
      createdBy: admin.id,
    });
    adminMessage.save();
    console.log('added a message from admin');
  } catch (error) {
    console.error(error);
  }
};

connectToDb();
addToDb();
