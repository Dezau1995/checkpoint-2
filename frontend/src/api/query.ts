import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query ($code: String!) {
    country(code: $code) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;
