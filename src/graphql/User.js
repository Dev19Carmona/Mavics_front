import { gql } from "@apollo/client";

export const userLogin = gql`
mutation UserLogin($filter: Login) {
  userLogin(filter: $filter)
}
`;
