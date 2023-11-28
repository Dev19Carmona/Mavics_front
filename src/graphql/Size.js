import { gql } from "@apollo/client";

export const Sizes = gql`
  query Sizes($filter: sizeFilter) {
    sizes(filter: $filter) {
      _id
      categories {
        _id
        isRemove
        name
      }
      name
      isRemove
    }
  }
`;
