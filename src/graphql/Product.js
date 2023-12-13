import { gql } from "@apollo/client";

export const productCount = gql`
  query Query($filter: productFilter) {
    productCount(filter: $filter)
  }
`;

export const products = gql`
  query Products($filter: productFilter) {
    products(filter: $filter) {
      _id
      createdAt
      isAvailable
      isRemove
      name
      description
      gender
      supplier {
      name
      phone
    }
      sizes {
        _id
        amount
        name
      }
      price
      supplier {
        _id
        isActive
        isRemove
        manager
        name
        nit
        phone
      }
      supplierId
      tags {
        _id
        isRemove
        name
      }
      updatedAt
      urlImage
    }
  }
`;

export const ProductSave = gql`
  mutation ProductSave($data: productData) {
    productSave(data: $data) {
      _id
      createdAt
      isAvailable
      isRemove
      name
      price
      urlImage
      supplierId
      supplier {
        _id
        isActive
        isRemove
        manager
        name
        nit
        phone
      }
      tags {
        _id
        isRemove
        name
      }
      updatedAt
    }
  }
`;

export const Product_delete = gql`
  mutation Product_delete($id: String) {
    Product_delete(_id: $id) {
      _id
      createdAt
      isAvailable
      isRemove
      name
      price
      supplier {
        _id
        isActive
        isRemove
        manager
        name
        nit
        phone
      }
      supplierId
      tags {
        _id
        isRemove
        name
      }
      updatedAt
      urlImage
    }
  }
`;
