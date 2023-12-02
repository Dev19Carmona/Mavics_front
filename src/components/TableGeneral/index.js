import { useColorModeGeneral } from "@/hooks/useColorModeGeneral";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const TableGeneral = ({ array = [] }) => {
  const { colorMode } = useColorModeGeneral();
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Talla</Th>
            <Th>Cantidad</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>38</Td>
            <Td>10</Td>
          </Tr>
          
        </Tbody>
      </Table>
    </TableContainer>
  );
};
