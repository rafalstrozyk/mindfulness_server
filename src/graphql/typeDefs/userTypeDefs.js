import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    username: String
    id: ID
    email: String
    firstName: String
    lastName: String
    birthday: Date
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    logout: Boolean
  }
`;

export default typeDefs;
