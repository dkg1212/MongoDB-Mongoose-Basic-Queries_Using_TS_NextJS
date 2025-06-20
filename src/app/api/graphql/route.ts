// src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';

// Import our database connection and models
import connectDB from '@/lib/db';
import User from '@/models/User';
import Post from '@/models/Post';

// 1. UPDATED GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    content: String!
    author: User!
  }

  type Query {
    users: [User!]!
    posts: [Post!]!
  }
`;

// 2. UPDATED Resolvers
const resolvers = {
  Query: {
    // Resolver to fetch all users
    users: async () => {
      await connectDB(); // Ensure DB is connected
      return User.find({});
    },
    // Resolver to fetch all posts and their authors
    posts: async () => {
      await connectDB(); // Ensure DB is connected
      // .populate('author') is the magic that fetches the related User document
      return Post.find({}).populate('author');
    },
  },
};

// Boilerplate Apollo Server setup (same as before)
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };