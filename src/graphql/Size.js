import { gql } from "@apollo/client";

export const Sizes = gql`
  query Sizes($filter: sizeFilter) {
    sizes(filter: $filter) {
      _id
      category {
        _id
        isRemove
        name
      }
      isRemove
      name
    }
  }
`;
