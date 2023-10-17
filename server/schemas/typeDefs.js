const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }

  type Movie {
    movieId: ID!
    year: String
    plot: String
    poster: String
    genre: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    year: String
    plot: String!
    movieId: String!
    poster: String
    genre: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(MovieId: ID!): User
  }
`;

module.exports = typeDefs;