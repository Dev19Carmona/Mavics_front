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

export const SizeSave = gql`
  mutation SizeSave($data: sizeData) {
    sizeSave(data: $data) {
      _id
      categories {
        _id
        isRemove
        name
      }
      isRemove
      name
    }
  }
`;
