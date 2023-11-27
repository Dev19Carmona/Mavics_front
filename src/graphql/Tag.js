import { gql } from "@apollo/client";

export const tagCount = gql`
  query Query($filter: tagFilter) {
    tagCount(filter: $filter)
  }
`;

export const Tags = gql`
  query Tags($filter: tagFilter) {
    tags(filter: $filter) {
      _id
      isRemove
      name
    }
  }
`;
