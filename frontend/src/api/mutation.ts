import { gql } from "@apollo/client";

export const ADD_COUNTRY = gql`
  mutation (
    $name: String!
    $code: String!
    $emoji: String!
    $continent: String
  ) {
    addCountry(name: $name, code: $code, emoji: $emoji, continent: $continent) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;
