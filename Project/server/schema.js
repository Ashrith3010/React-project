const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Transaction {
    id: ID!
    amount: Float!
    type: String!
    category: String!
    date: Date!
    description: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    transaction(id: ID!): Transaction
    transactions: [Transaction]
  }

  type Mutation {
    addTransaction(amount: Float!, type: String!, category: String!, date: Date!, description: String): Transaction
    updateTransaction(id: ID!, amount: Float, type: String, category: String, date: Date, description: String): Transaction
    deleteTransaction(id: ID!): Boolean
    login(email: String!, password: String!): String
    register(username: String!, email: String!, password: String!): String
    updateUser(id: ID!, username: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;
