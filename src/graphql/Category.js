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

export const CategorySave = gql`
  mutation CategorySave($data: categoryData) {
    categorySave(data: $data) {
      _id
      name
      isRemove
    }
  }
`;
