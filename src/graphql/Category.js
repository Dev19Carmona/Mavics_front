import { gql } from "@apollo/client";

export const Categories = gql`
  query Categories($filter: categoryFilter) {
  categories(filter: $filter) {
    name
    _id
    isRemove
  }
}
`;
