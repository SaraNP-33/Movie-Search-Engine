import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveBook($movieData: MovieInput!) {
    saveMovie(movieData: $movieData) {
      _id
      username
      email
      savedMovies {
        movieId
        year
        plot
        poster
        genre
        title
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeBook($movieId: ID!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      email
      savedMovies {
        movieId
        year
        plot
        poster
        genre
        title
      }
    }
  }
`;