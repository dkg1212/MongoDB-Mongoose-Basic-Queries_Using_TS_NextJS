import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import Post from '../src/models/Post';

// Configure dotenv to load .env.local
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env.local');
  }
  
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');
  
  try {
    console.log('Cleaning old data...');
    await User.deleteMany({});
    await Post.deleteMany({});

    console.log('Creating new data...');
    const userVconnect = await User.create({ name: 'Vconnect', email: 'vconnect@gmail.com' });
    const userRoman = await User.create({ name: 'Roman', email: 'Roman01@gmail.com' });

    await Post.create({ content: 'GraphQL is amazing!', author: userVconnect._id });
    await Post.create({ content: 'Learning Next.js is fun.', author: userRoman._id });
    await Post.create({ content: 'He posts again.', author: userVconnect._id });
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedDatabase();