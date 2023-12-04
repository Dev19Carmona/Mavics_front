import { gql } from "@apollo/client";

export const supplierSave = gql`
  mutation SupplierSave($data: supplierData) {
    supplierSave(data: $data) {
      _id
      isActive
      isRemove
      name
      nit
      phone
    }
  }
`;

export const suppliers = gql`
  query Suppliers($filter: supplierFilter) {
    suppliers(filter: $filter) {
      _id
      isActive
      isRemove
      manager
      name
      nit
      phone
    }
  }
`;
